import React, { useState } from "react";
import axios from "axios"; // Import axios
import { Confirm } from "../pages"; // Import Confirm component
import { ClipLoader } from "react-spinners"; // Import ClipLoader từ react-spinners

const SearchFlight = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State để kiểm tra trạng thái loading

  // Hàm xử lý sự kiện tìm kiếm
  const handleSearch = async () => {
    setError(null); // Clear lỗi trước khi tìm kiếm
    setOrderData(null); // Clear dữ liệu trước khi tìm kiếm
    setIsLoading(true); // Bắt đầu loading

    try {
      // Thực hiện gọi API bằng axios
      const response = await axios.get(
        `https://localhost:7021/api/FlightBooking/order/${encodeURIComponent(
          orderId
        )}` // Sử dụng endpoint thật
      );

      // Thêm delay 3s để tạo hiệu ứng loading
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Lưu dữ liệu nhận được
      setOrderData(response.data);
    } catch (err) {
      // Xử lý lỗi
      if (err.response) {
        // Lỗi từ phía server (ví dụ: 404, 500, ...)
        setError(
          err.response.data.message ||
            "Không tìm thấy thông tin với OrderId này."
        );
      } else if (err.request) {
        // Lỗi không kết nối được đến server
        setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại.");
      } else {
        // Lỗi khác
        setError("Đã xảy ra lỗi khi xử lý yêu cầu.");
      }
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Tìm kiếm vé đã đặt</h1>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Nhập OrderId"
          className="border border-gray-300 rounded-md p-2 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Tìm kiếm
        </button>
      </div>

      {/* Hiển thị trạng thái loading */}
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <ClipLoader color="#605DEC" loading={isLoading} size={50} />
        </div>
      )}

      {/* Hiển thị lỗi nếu có */}
      {error && !isLoading && <p className="text-red-500 mt-4">{error}</p>}

      {/* Hiển thị Confirm nếu có dữ liệu */}
      {orderData && !isLoading && (
        <div className="mt-8">
          {" "}
          {/* Thêm khoảng cách bằng TailwindCSS */}
          <Confirm order={orderData} />
        </div>
      )}
    </div>
  );
};

export default SearchFlight;
