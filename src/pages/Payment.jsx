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

  const { travelers, flightSelected } = location.state;
  const flightOffers = flightSelected.flightOffers;

  const getUpdatedPricing = async () => {
    const flightPricingRequest = flightOffers[0];
    const response = await axios.post(
      "https://localhost:7021/api/FlightBooking/searchFlightPricing",
      flightPricingRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  };

  const createFlightOrder = async () => {
    const flightOrderRequest = {
      travelers: travelers,
      flightOffers: flightOffers,
    };
    console.log(flightOrderRequest);
    try {
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
      setLoading(false);
    } catch (error) {
      const flightPricingUpdated = await getUpdatedPricing();
      flightOffers[0] = flightPricingUpdated.flightOffers[0];
      await createFlightOrder();
    }
  };

  useEffect(() => {
    createFlightOrder();
  }, []);

  const handlePaymentConfirm = () => {
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
            <div className="w-full flex flex-col items-start justify-start gap-5">
              <div className="flex flex-col items-start justify-start gap-2">
                <h2 className="text-[#6E7491] text-xl">Tạo tài khoản</h2>
                <p className="text-[#7C8DB0] text-base font-normal">
                  Chúng tôi miễn phí sử dụng làm khách, nhưng nếu bạn tạo một
                  tài khoản ngay hôm nay, bạn có thể lưu và xem các chuyến bay,
                  quản lý các chuyến đi của bạn, kiếm phần thưởng và hơn thế
                  nữa.
                </p>
              </div>
              <form className="w-full h-full flex flex-col items-start justify-start gap-5 mt-5">
                <input
                  type="text"
                  placeholder="Email hoặc số điện thoại"
                  className="w-full sm:w-[480px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="w-full sm:w-[480px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                />
              </form>
              <div className="w-full sm:w-[480px] flex items-center justify-center gap-2 mt-7">
                <div className="w-full text-[#A1B0CC] border-t-[1px] border-t-[#A1B0CC] h-1 " />
                <p className="text-[#7C8DB0] text-[18px] leading-6">or</p>
                <div className="w-full text-[#A1B0CC] border-t-[1px] border-t-[#A1B0CC] h-1" />
              </div>
              <div className="w-full sm:w-[480px] flex flex-col items-center justify-center gap-4">
                <button className="w-full flex gap-2 items-center justify-center border-[1px] border-[#605DEC] rounded p-3 hover:bg-gray-300">
                  <FcGoogle className="w-[18px] h-[18px]" />
                  <p className="text-[#605CDE] text-[16px] leading-6">
                    Continue with Google
                  </p>
                </button>
                <button className="w-full flex gap-2 items-center justify-center border-[1px] border-[#605DEC] rounded p-3 hover:bg-gray-300">
                  <IoLogoApple className="w-[18px] h-[18px] text-black" />
                  <p className="text-[#605CDE] text-[16px] leading-6">
                    Continue with Apple
                  </p>
                </button>
                <button className="w-full flex gap-2 items-center justify-center border-[1px] border-[#605DEC] rounded p-3 hover:bg-gray-300">
                  <img src={iconfacebook} className="w-[18px] h-[18px]" />
                  <p className="text-[#605CDE] text-[16px] leading-6">
                    Continue with Facebook
                  </p>
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-5">
              <div className="flex flex-col items-start justify-start gap-3">
                <h2 className="text-[#6E7491] text-xl">Cancellation policy</h2>
                <p className="text-[#7C8DB0] text-base font-normal">
                  This flight has a flexible cancellation policy. If you cancel
                  or change your flight up to 30 days before the departure date,
                  you are eligible for a free refund. All flights booked on
                  Tripma are backed by our satisfaction guarantee, however
                  cancellation policies vary by airline. See the{" "}
                  <span className="text-[#605CDE]">
                    {" "}
                    full cancellation policy
                  </span>{" "}
                  for this flight.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <button
                  onClick={handlePaymentConfirm}
                  className="py-2 px-4 border-[1px] border-[#605DEC] text-[#605DEC] rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200"
                >
                  Xác nhận và Thanh toán
                </button>
              </div>
              {/* <Link>
              <button
                className="hidden lg:block py-2 px-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200"
                onClick={submitInputs}
              >
                Xác nhận và Thanh toán
              </button>
            </Link> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
