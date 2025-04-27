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
import { loadStripe } from "@stripe/stripe-js";
import { ClipLoader } from "react-spinners";

const stripePromise = loadStripe(
  "pk_test_51RBKBWQrYprjBNZgp0fIgCwT6PlnZXLm5eX6vNYbC5owTzUTlIfzwbvWKagicRkYgPCUGq83WuDi7qFJXxCkTHDl00b258n5Rr"
);

const Payment = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [ccv, setCcv] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);

  const { travelers, flightSelected } = location.state || {};
  const flightOffers = flightSelected?.flightOffers;

  const getUpdatedPricing = async () => {
    try {
      const requestBody = {
        flightOffers: flightOffers,
      };
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
      setTimeout(() => navigate("/"), 3000); // ❌ lỗi => redirect về /
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
      toast.success("Đặt vé thành công!");
    } catch (error) {
      console.error("Lỗi khi tạo đơn đặt vé:", error);
      toast.error("Không thể đặt vé. Vé bạn lựa chọn đã hết chỗ.");
      setTimeout(() => navigate("/"), 3000); // ❌ lỗi => redirect về /
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!flightOffers || !travelers) {
      toast.error("Thiếu dữ liệu chuyến bay hoặc hành khách.");
      setTimeout(() => navigate("/"), 3000);
      setLoading(false);
      return;
    }
    createFlightOrder();
  }, []);

  // Khi `orders` được tạo thành công => gọi thanh toán Stripe luôn
  useEffect(() => {
    if (orders && Object.keys(orders).length > 0) {
      handlePaymentConfirm();
    }
  }, [orders]);

  const handlePaymentConfirm = async () => {
    try {
      const stripe = await stripePromise;
      const response = await axios.post(
        "https://localhost:7021/api/Stripe/CreateCheckoutSession",
        orders,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const sessionId = response.data.sessionId;

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        toast.error(result.error.message);
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (error) {
      console.error("Lỗi khi chuyển hướng đến Stripe:", error);
      toast.error("Có lỗi xảy ra khi xử lý thanh toán.");
      setTimeout(() => navigate("/"), 3000);
    }
  };

  const submitInputs = (e) => {
    e.preventDefault();

    if (name.trim() && number.trim() && ccv.trim() && date.trim()) {
      toast.success("Payment sent successfully");
      navigate("/confirm");
    } else {
      toast.warning("Please fill the card details");
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <ClipLoader color="#605DEC" size={50} /> {/* ✅ Spinner loader */}
        </div>
      ) : null}
    </>
  );
};

export default Payment;
