import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FlightCard } from "../container";
import { creditCard } from "../assets/icons";
import { map1 } from "../assets/images";
import { ConfirmShop } from "../components";
import { useNavigate, useLocation } from "react-router-dom";
import {
  delta,
  france,
  hawaiian,
  japan,
  quantas,
  united,
  vietnamairlines,
  vietjetair,
} from "../assets/logo";

const Confirm = () => {
  const [close, setClose] = useState(true);
  const location = useLocation();
  const { order } = location.state;
  const flightOffers = order.flightOffers;
  const itineraries = order.flightOffers[0].itineraries;
  console.log(itineraries);
  console.log(order);
  const fullName = `${order.travelers[0].name.firstName.toUpperCase()}  ${order.travelers[0].name.lastName.toUpperCase()}`;

  const airlineNames = {
    VJ: "Vietjet Air",
    VN: "Vietnam Airlines",
    H1: "Hawaiian Airlines",
    A1: "American Airlines",
    QF: "Qantas",
    UA: "United Airlines",
    DL: "Delta Air Lines",
    FR: "France Airways",
  };
  const airlineLogos = {
    VJ: vietjetair,
    VN: vietnamairlines,
    H1: hawaiian,
    A1: japan,
    QF: quantas,
    UA: united,
    DL: delta,
    FR: france,
  };

  const getAirlineName = (carrierCode) =>
    airlineNames[carrierCode] || carrierCode;

  const airlineLogo = (carrierCode) => airlineLogos[carrierCode] || "";

  const getTimeFlight = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (duration) => {
    const hoursMatch = duration.match(/(\d+)H/); // Lấy số giờ
    const minutesMatch = duration.match(/(\d+)M/); // Lấy số phút

    const hours = hoursMatch ? `${hoursMatch[1]}g` : "";
    const minutes = minutesMatch ? `${minutesMatch[1]}p` : "";

    return `${hours} ${minutes}`.trim();
  };

  const getStopInfo = (segments) => {
    if (segments.length === 1) return "Bay thẳng";

    const stopInfo = segments.slice(0, -1).map((segment, index) => {
      const nextSegment = segments[index + 1];

      const arrivalTime = new Date(segment.arrival.at);
      const departureTime = new Date(nextSegment.departure.at);

      const stopDurationMinutes = (departureTime - arrivalTime) / (1000 * 60);
      const hours = Math.floor(stopDurationMinutes / 60);
      const minutes = stopDurationMinutes % 60;

      const stopDuration = `${hours > 0 ? `${hours}g ` : ""}${minutes}p`;
      const stopLocation = segment.arrival.iataCode; // Mã sân bay

      return `${stopDuration} tại ${stopLocation}`;
    });

    return stopInfo.join(", ");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="px-8 w-full h-full flex lg:flex-row flex-col justify-between items-start mt-20 gap-10 ">
        <div className="w-full lg:w-[756px] flex flex-col items-start gap-16">
          {close && (
            <div className="w-full lg:w-[704px] h-[64px] border-2 border-[#007B65] bg-[#EAFFFB] rounded  p-2 hidden md:flex items-center justify-center  ">
              <p className="w-full h-full flex items-center justify-start text-[#007B65] text-xs sm:text-base">
                Chuyến bay của bạn đã được đặt thành công! Xác nhận của bạn Số
                là {order.id}
              </p>
              <MdOutlineClose
                className="text-[#52527A] font-medium cursor-pointer"
                onClick={() => setClose(false)}
              />
            </div>
          )}

          <div className=" w-full flex flex-col items-start justify-start gap-2">
            <h1 className="titleh1">Xin chào, {fullName}!</h1>
            <p className="text-[#6E7491] text-base sm:text-lg font-semibold">
              Số xác nhận: {order.id}
            </p>
            <p className="text-[#7C8DB0] text-sm sm:text-base font-medium">
              Cảm ơn bạn đã đặt chuyến đi của bạn với NHÓM 9!. Chúng tôi đã gửi
              một bản sao xác nhận đặt phòng của bạn đến địa chỉ email của bạn.
              Bạn cũng có thể tìm lại trang này trong các{" "}
              <span className="text-[#605DEC]"> chuyến đi của tôi</span>
            </p>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-4">
            <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">
              Tóm tắt chuyến bay
            </h1>
            {itineraries.map((segment, index) => {
              const firstSegment = segment.segments[0]; // Chuyến đầu của hành trình
              const lastSegment = segment.segments[segment.segments.length - 1]; // Chuyến cuối của hành trình

              // Xác định chiều đi/chiều về dựa vào sân bay
              const isOutbound = index === 0; // Chuyến đầu tiên là chiều đi
              const isReturn = itineraries.length > 1 && index === 1; // Chuyến thứ hai là chiều về

              return (
                <>
                  <div className="w-full flex flex-col items-start gap-2">
                    <p className="text-[#7C8DB0] text-base sm:text-lg font-semibold">
                      {isOutbound
                        ? "Chiều đi"
                        : isReturn
                        ? "Chiều về"
                        : "Chặng bay"}{" "}
                      - {formatDate(firstSegment.departure.at)}
                    </p>
                    <div className="w-full cursor-pointer border-[1px] border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]">
                      <FlightCard
                        img={airlineLogo(firstSegment.carrierCode)}
                        duration={formatDuration(firstSegment.duration)}
                        name={getAirlineName(firstSegment.carrierCode)}
                        time={`${getTimeFlight(
                          firstSegment.departure.at
                        )} - ${getTimeFlight(lastSegment.arrival.at)}`}
                        stop={getStopInfo(segment.segments)}
                        hnl="2h 45m in HNL"
                        price={Number(
                          order.flightOffers[0].price.total
                        ).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                        trip={itineraries.length >= 2 ? "Khứ hồi" : "Một chiều"}
                        travelClass={
                          order.flightOffers[0].travelerPricings[0]
                            .fareDetailsBySegment[0].cabin
                        }
                      />
                    </div>
                    <p className="text-[#7C8DB0] text-sm sm:text-base font-normal">
                      Seat 9F (economy, window), 1 checked bag
                    </p>
                  </div>
                </>
              );
            })}
          </div>
          <div className="w-full flex flex-col items-start gap-5">
            <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">
              Price breakdown
            </h1>
            <div className="w-full h-full sm:w-[400px] flex flex-col items-start gap-3 ">
              <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3">
                <p>Departing Flight</p>
                <p>$251.50</p>
              </div>
              <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3">
                <p>Arriving Flight</p>
                <p>$251.50</p>
              </div>
              <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3">
                <p>Baggage fees</p>
                <p>$0</p>
              </div>
              <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3">
                <p>Seat upgrade (business)</p>
                <p>$199</p>
              </div>
              <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3">
                <p>Subtotal</p>
                <p>$702</p>
              </div>
              <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3">
                <p>Taxes (9.4%)</p>
                <p>$66</p>
              </div>
              <hr className="w-full mt-5" />
              <div className="flex items-center justify-between w-full text-[#36374A] text-sm sm:text-base gap-3">
                <p>Amount paid</p>
                <p>$768</p>
              </div>
              <hr className="w-full " />
            </div>
          </div>

          <div className="w-full h-full flex flex-col items-start justify-start gap-5">
            <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">
              Payment method
            </h1>
            <div className="w-[300px] h-[188px]">
              <img
                src={creditCard}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="w-full h-full flex flex-col items-start justify-start gap-4">
            <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">
              Share your travel itinerary
            </h1>
            <p className="text-[#7C8DB0] text-base sm:text-lg font-normal">
              You can email your itinerary to anyone by entering their email
              address here.
            </p>
            <form className="w-full h-full flex flex-col items-start justify-start gap-5 mt-5">
              <input
                type="text"
                placeholder="Email address "
                className="w-full sm:w-[400px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
              />
            </form>
            <div className="flex justify-center items-center mt-2">
              <button className="bg-[#605DEC] text-[#FAFAFA] text-base px-2 py-3 rounded hover:bg-white border-[1px] border-[#605DEC] hover:text-[#605DEC] transition-all duration-200">
                Email itinerary
              </button>
            </div>
          </div>
          <div className="w-full h-full flex flex-col items-start justify-start gap-4">
            <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">
              Flight Route
            </h1>
            <div className="w-full h-full md:w-[750px] md:h-[400px]">
              <img src={map1} alt="" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        <div className="w-full sm:w-[400px] h-full flex flex-col items-start gap-28">
          <ConfirmShop />
        </div>
      </div>
    </>
  );
};

export default Confirm;
