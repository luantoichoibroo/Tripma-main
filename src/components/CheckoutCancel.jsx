import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutCancel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");

    console.log("sessionId", sessionId);

    const updatePaymentStatus = async () => {
      try {
        // Gửi yêu cầu cập nhật trạng thái thanh toán
        const response = await axios.post(
          `https://localhost:7021/api/FlightBooking/checkoutCancel`,
          null, // Không có payload body
          { params: { sessionId } } // Gửi sessionId dưới dạng query parameter
        );

        console.log("Cập nhật trạng thái:", response.data);

        // Tự động redirect sau 3 giây
        setTimeout(() => {
          navigate("/"); // Điều hướng về trang chủ
        }, 3000);
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái thanh toán:", error);
      }
    };

    updatePaymentStatus();
  }, [location.search, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Thanh toán thất bại
        </h1>
        <p className="text-gray-700 mb-6">
          Có vẻ như bạn đã hủy thanh toán. Đừng lo, bạn sẽ được chuyển hướng về
          trang chủ trong giây lát.
        </p>
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;
