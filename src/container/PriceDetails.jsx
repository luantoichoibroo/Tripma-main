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

const PriceDetails = ({ flightsPricing }) => {
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
    airlineNames[carrierCode] || "Unknown Airline";

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

  const getFlightNumber = (segment) => {
    if (!segment) {
      return null;
    }
    return `${segment[0].carrierCode}${segment[0].number}`;
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
  const checkedBags = (fareDetailsBySegment) => {
    const includedCheckedBags = fareDetailsBySegment[0]?.includedCheckedBags;
    if (!includedCheckedBags) {
      return;
    }

    if (includedCheckedBags.weightUnit && includedCheckedBags.weight) {
      return `${includedCheckedBags.weight} ${includedCheckedBags.weightUnit}`;
    }

    if (typeof includedCheckedBags.quantity === "number") {
      return `${includedCheckedBags.quantity} túi(s)`;
    }

    return "Không có hành lý nào";
  };

  return (
    <>
      <div className="flex flex-col items-start lg:items-end justify-start lg:justify-end gap-5 w-full h-full sm:w-[400px]">
        <div className=" w-full border-[1px] border-[#E9E8FC] rounded-lg  flex flex-col gap-2">
          <div className="flex items-start justify-between w-full p-3 ">
            <div className="flex items-start justify-start gap-2">
              <img
                src={airlineLogo(
                  flightsPricing.flightOffers[0].itineraries[0].segments[0]
                    .carrierCode
                )}
                alt={
                  flightsPricing.flightOffers[0].itineraries[0].segments[0]
                    .carrierCode
                }
                className="w-6 h-6 sm:w-9 sm:h-9 object-contain"
              />
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-[#27273F] font-normal text-sm sm:text-base">
                  {getAirlineName(
                    flightsPricing.flightOffers[0].itineraries[0].segments[0]
                      .carrierCode
                  )}
                </h1>
                <p className="text-[#7C8DB0] font-normal text-sm sm:text-base">
                  {getFlightNumber(
                    flightsPricing.flightOffers[0].itineraries[0].segments
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-[#27273F] font-normal text-sm sm:text-base">
                {formatDuration(
                  flightsPricing.flightOffers[0].itineraries[0].segments[0]
                    .duration
                )}
              </p>
              <p className="text-[#27273F] font-normal text-sm sm:text-base">
                {`${getTimeFlight(
                  flightsPricing.flightOffers[0].itineraries[0].segments[0]
                    .departure.at
                )} - ${getTimeFlight(
                  flightsPricing.flightOffers[0].itineraries[0].segments[0]
                    .arrival.at
                )}`}
              </p>
              <p className="text-[#7C8DB0] font-normal text-sm sm:text-base">
                {getStopInfo(
                  flightsPricing.flightOffers[0].itineraries[0].segments
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start justify-between w-full border-t-[1px] border-[#E9E8FC] px-3 py-4">
            <div className="flex items-start justify-start gap-2">
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-[#27273F] font-bold text-sm sm:text-base">
                  {
                    flightsPricing.flightOffers[0].travelerPricings[0]
                      .fareDetailsBySegment[0].cabin
                  }
                </h1>
                <p className="text-[#27273F] font-normal text-sm sm:text-base">
                  {
                    flightsPricing.flightOffers[0].travelerPricings[0]
                      .fareDetailsBySegment[0].class
                  }
                </p>
                <p className="text-[#27273F] font-bold text-sm sm:text-base">
                  Hành lý
                </p>
                <div className="flex items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="rgb(12 169 177/1)"
                    className="bizi-flight-h-5 bizi-flight-w-5 bizi-flight-text-accent"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_6644_11576)">
                      <path
                        d="M17 21.1665H15.3333V20.3332H8.66667V21.1665H7V20.3332H6.16667C5.24583 20.3332 4.5 19.5873 4.5 18.6665V7.83317C4.5 6.91234 5.24583 6.1665 6.16667 6.1665H8.66667V4.49984C8.66667 4.03984 9.04 3.6665 9.5 3.6665H14.5C14.96 3.6665 15.3333 4.03984 15.3333 4.49984V6.1665H17.8333C18.7542 6.1665 19.5 6.91234 19.5 7.83317V18.6665C19.5 19.5873 18.7542 20.3332 17.8333 20.3332H17V21.1665ZM17.8333 7.83317H6.16667V18.6665H17.8333V7.83317ZM10.3333 9.49984V16.9998H8.66667V9.49984H10.3333ZM15.3333 9.49984V16.9998H13.6667V9.49984H15.3333ZM13.6667 5.33317H10.3333V6.1665H13.6667V5.33317Z"
                        fill="rgb(12 169 177/1)"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_6644_11576">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(2 2)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="text-[#27273F] font-normal text-sm sm:text-base">
                    Hành lý ký gửi:
                    <span className="font-bold px-5">
                      {checkedBags(
                        flightsPricing.flightOffers[0].travelerPricings[0]
                          .fareDetailsBySegment
                      ) == null
                        ? "1 kiện"
                        : `1 kiện ${checkedBags(
                            flightsPricing.flightOffers[0].travelerPricings[0]
                              .fareDetailsBySegment
                          )}`}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-3 w-[231px]">
          <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
            <p>Tổng phụ</p>
            <p>
              {Number(
                flightsPricing.flightOffers[0].travelerPricings[0].price.base
              ).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
          <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
            <p>Thuế và Phí</p>
            <p>
              {Number(
                flightsPricing.flightOffers[0].travelerPricings[0].price
                  .refundableTaxes
              ).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
          <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
            <p>Tổng tiền</p>
            <p>
              {Number(
                flightsPricing.flightOffers[0].travelerPricings[0].price.total
              ).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceDetails;
