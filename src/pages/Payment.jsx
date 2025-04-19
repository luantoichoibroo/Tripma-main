import {
  AiFillApple,
  AiOutlineCreditCard,
  AiOutlineGoogle,
} from "react-icons/ai";
import { BsPaypal } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { SiBitcoin } from "react-icons/si";
import { IoLogoApple } from "react-icons/io";
import { iconfacebook } from "../assets/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PriceDetails } from "../container";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Payment = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [ccv, setCcv] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);

  const submitInputs = (e) => {
    e.preventDefault();

    if (
      name.trim() !== "" &&
      number.trim() !== "" &&
      ccv.trim() !== "" &&
      date.trim() !== ""
    ) {
      toast.success("Payment sent successfully");
      navigate("/confirm");
    } else {
      toast.warning("Please fill the card details");
    }
  };

  const { travelers, flightSelected } = location.state || {};
  const flightOffers = flightSelected?.flightOffers;

  const getUpdatedPricing = async () => {
    try {
      const requestBody = {
        flightOffers: flightOffers,
      };
      console.log(requestBody);
      const response = await axios.post(
        "https://localhost:7021/api/FlightBooking/searchFlightPricing",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi lấy giá mới:", error);
      toast.error("Không thể cập nhật giá vé. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  const createFlightOrder = async () => {
    try {
      const flightPricingUpdated = await getUpdatedPricing();
      if (!flightPricingUpdated) return;

      const flightOrderRequest = {
        travelers: travelers,
        flightOffers: [flightPricingUpdated.flightOffers[0]],
      };
      console.log(flightOrderRequest);

      const response = await axios.post(
        "https://localhost:7021/api/FlightBooking/CreateOrder",
        flightOrderRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setOrders(response.data.data);
      toast.success("Tạo đơn đặt vé thành công!"); // ✅ Thêm dòng này
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tạo đơn đặt vé:", error);
      toast.error("Không thể tạo đơn đặt vé. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!flightOffers || !travelers) {
      toast.error("Thiếu dữ liệu chuyến bay hoặc hành khách.");
      setLoading(false);
      return;
    }
    createFlightOrder();
  }, []);

  const handlePaymentConfirm = () => {
    if (!orders) {
      toast.error("Không tìm thấy thông tin đơn hàng!");
      return;
    }

    navigate("/confirm", {
      state: {
        order: orders,
      },
    });
  };

  return (
    <>
      {loading ? (
        "Đang tải......."
      ) : (
        <div className="px-8 w-full h-full flex lg:flex-row flex-col justify-between items-start mt-20 gap-10">
          <div className="w-full lg:w-[686px] flex flex-col items-start gap-12">
            <div className="flex flex-col items-start gap-2 w-full">
              <h1 className="titleh1">Thanh toán</h1>
              <p className="text-[#7C8DB0] text-base font-normal">
                Chọn một phương thức thanh toán bên dưới. Chúng tôi sẽ xử lý
                khoản thanh toán của bạn một cách an toàn với mã hóa từ đầu đến
                cuối.
              </p>
            </div>
            <div className="w-full h-12 md:w-[686px] border-2 border-[#605DEC] flex justify-between items-center rounded">
              <p className="w-full h-full flex items-center justify-center gap-1 bg-[#605DEC] text-[#FAFAFA] text-sm sm:text-base">
                <AiOutlineCreditCard />
                <span>Credit card</span>
              </p>
              <p className="text-sm sm:text-base w-full h-full flex items-center justify-center text-[#605DEC] gap-1 hover:bg-[#605DEC] hover:text-[#FAFAFA] focus:bg-[#605DEC] focus:text-[#FAFAFA] transition-all duration-200 ">
                <AiOutlineGoogle />
                <span>Google pay</span>
              </p>
              <p className="paymentoptions">
                <AiFillApple />
                <span>Apple pay</span>
              </p>
              <p className="text-sm sm:text-base w-full h-full flex items-center justify-center text-[#605DEC] gap-1 hover:bg-[#605DEC] hover:text-[#FAFAFA] focus:bg-[#605DEC] focus:text-[#FAFAFA] transition-all duration-200 ">
                <BsPaypal />
                <span>Pay pal</span>
              </p>
              <p className="paymentoptions">
                <SiBitcoin />
                <span>Crypto</span>
              </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-5">
              <h2 className="text-[#6E7491] text-xl">
                Thông tin thẻ thanh toán
              </h2>
              <form className="w-full h-full flex flex-col items-start justify-start gap-5">
                <input
                  type="text"
                  placeholder="Tên chủ thẻ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full sm:w-[480px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                />
                <input
                  type="text"
                  placeholder="Số thẻ"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full sm:w-[480px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                />
                <div className="flex items-center justify-center gap-5">
                  <input
                    type="text"
                    placeholder="Ngày hết hạn"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full sm:w-[240px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                  />
                  <input
                    type="text"
                    placeholder="CCV"
                    value={ccv}
                    onChange={(e) => setCcv(e.target.value)}
                    className="w-full sm:w-[216px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                  />
                </div>
              </form>
            </div>
            {/* Các phần khác giữ nguyên như bạn đã viết */}
            {/* ... */}
            <div className="flex items-center gap-5">
              <button
                onClick={submitInputs}
                className="py-2 px-4 border-[1px] border-[#605DEC] text-[#605DEC] rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200"
              >
                Thanh toán
              </button>
              <button
                onClick={handlePaymentConfirm}
                className="py-2 px-4 border-[1px] border-[#605DEC] text-[#605DEC] rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200"
              >
                Xác nhận đơn hàng
              </button>
            </div>
          </div>

          {/* Bạn có thể thêm <PriceDetails /> hoặc phần hiển thị giá bên cạnh tại đây nếu muốn */}
        </div>
      )}
    </>
  );
};

export default Payment;
