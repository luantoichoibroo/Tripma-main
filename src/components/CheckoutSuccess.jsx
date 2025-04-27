import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Confirm } from "../pages"; // Import Confirm

const CheckoutSuccess = () => {
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");

    console.log("sessionId", sessionId);

    const updatePaymentStatus = async () => {
      try {
        // Gửi yêu cầu cập nhật trạng thái thanh toán
        const response = await axios.post(
          `https://localhost:7021/api/FlightBooking/checkoutSuccess`,
          null, // Không có payload body
          { params: { sessionId } } // Gửi sessionId dưới dạng query parameter
        );

        console.log("Cập nhật trạng thái:", response.data);

        // Lấy chi tiết đơn hàng
        const orderResponse = await axios.get(
          `https://localhost:7021/api/FlightBooking/GetOrderBySessionId`,
          { params: { sessionId } }
        );

        setOrder(orderResponse.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin đơn hàng:", error);
        setError("Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.");
      }
    };

    updatePaymentStatus();
  }, [location.search]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!order) {
    return <p>Đang tải...</p>;
  }

  return (
    <div>
      <Confirm order={order} />
    </div>
  );
};

export default CheckoutSuccess;
