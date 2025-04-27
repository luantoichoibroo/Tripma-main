import { useState, useEffect } from "react";
import { map } from "../assets/images";
import axios from "axios";
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
import { FlightCard, PriceDetails } from "../container";
import { useNavigate } from "react-router-dom";

const FlightChoose = (props) => {
  const [priceShown, setPriceShow] = useState(false);
  const [selectedPriceData, setSelectedPriceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePriceToggle = () => {
    setPriceShow((prevState) => !prevState); // Toggle trạng thái hiển thị giá
  };

  const handleFlightClick = async (flight) => {
    if (isLoading) return; // Ngăn người dùng click liên tục khi đang xử lý

    setIsLoading(true); // Bắt đầu xử lý
    try {
      const requestBody = {
        flightOffers: [
          {
            type: "flight-offer",
            id: flight.id,
            lastTicketingDateTime: flight.lastTicketingDateTime,
            price: flight.price,
            itineraries: flight.itineraries,
            travelerPricings: flight.travelerPricings,
            validatingAirlineCodes: flight.validatingAirlineCodes,
            source: flight.source,
            pricingOptions: flight.pricingOptions,
          },
        ],
      };

      console.log(requestBody);

      const response = await axios.post(
        "http://banvemaybaynhom9.runasp.net/api/FlightBooking/searchFlightPricing",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedPriceData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error booking flight", error);
    } finally {
      setIsLoading(false); // Kết thúc xử lý
    }
  };

  useEffect(() => {
    if (selectedPriceData) {
      setPriceShow(true); // Hiển thị PriceDetails khi đã nhận được dữ liệu
    }
  }, [selectedPriceData]);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 10;

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

  // Lọc chỉ các chuyến bay của các hãng hàng không Việt Nam
  const filteredFlights = props.flights;

  // Tính toán chuyến bay hiển thị cho mỗi trang
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(
    indexOfFirstFlight,
    indexOfLastFlight
  );

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Tính toán tổng số trang
  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);

  const handleCreateOrder = () => {
    navigate("/passenger-info", {
      state: {
        selectedPriceData: selectedPriceData,
      },
    });
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col items-start justify-between gap-16 ">
        <div className="w-full lg:w-[872px] h-full flex flex-col gap-5">
          <div className="flex items-start justify-start">
            <h1 className="text-[#6E7491] text-lg leading-6 font-semibold">
              Chọn một chuyến bay <span className="text-[#605DEC]">để đi </span>
              / <span className="text-[#605DEC]">trở về </span>
            </h1>
          </div>
          <div className="w-full flex flex-col items-start justify-start border-[1px] border-[#E9E8FC] rounded-xl">
            <div className="w-full">
              {currentFlights.map((item, index) => (
                <div
                  key={index}
                  className={`cursor-pointer hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE] ${
                    isLoading ? "pointer-events-none opacity-50" : ""
                  }`}
                  onClick={() => handleFlightClick(item)}
                >
                  <FlightCard
                    img={airlineLogo(
                      item.itineraries[0].segments[0].carrierCode
                    )}
                    duration={formatDuration(item.itineraries[0].duration)}
                    name={getAirlineName(
                      item.itineraries[0].segments[0].carrierCode
                    )}
                    time={`${getTimeFlight(
                      item.itineraries[0].segments[0].departure.at
                    )} - ${getTimeFlight(
                      item.itineraries[0].segments[0].arrival.at
                    )}`}
                    stop={getStopInfo(item.itineraries[0].segments)}
                    price={Number(item.price.total).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                    trip={
                      item.itineraries.length >= 2 ? "Khứ hồi" : "Một chiều"
                    }
                    travelClass={
                      item.travelerPricings[0].fareDetailsBySegment[0].cabin
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center gap-3 mt-5 flex-wrap">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`py-2 px-3 rounded ${
                  currentPage === index + 1
                    ? "bg-[#605DEC] text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="w-full lg:mt-12">
            <img src={map} alt="map" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Hiển thị thông tin giá nếu priceShown là true */}
        {priceShown && selectedPriceData && (
          <div className="mt-10 flex flex-col gap-10 justify-end items-start lg:items-end">
            <PriceDetails flightsPricing={selectedPriceData.data} />
            <div className="mt-5">
              <button
                onClick={handleCreateOrder}
                className="text-[#605DEC] border-2 border-[#605DEC] py-2 px-3 rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200"
              >
                Đặt vé
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FlightChoose;
