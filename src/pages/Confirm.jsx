import React from "react";
import QRCode from "react-qr-code";
import { flighticon } from "../assets/logo";

const Confirm = ({ order }) => {
  const flightOffer = order.flightOffers[0];
  const itineraries = flightOffer.itineraries;
  const traveler = order.travelers[0];

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (time) => {
    return new Date(time).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDuration = (duration) => {
    const hoursMatch = duration.match(/(\d+)H/); // Lấy số giờ
    const minutesMatch = duration.match(/(\d+)M/); // Lấy số phút

    const hours = hoursMatch ? `${hoursMatch[1]}h` : "";
    const minutes = minutesMatch ? `${minutesMatch[1]}p` : "";

    return `${hours} ${minutes}`.trim();
  };

  return (
    <div className="ticket-container max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="ticket-header bg-blue-900 text-white flex justify-between items-center px-4 py-2">
        <div>
          <h1 className="text-xl font-bold">Nhóm 9 Air</h1>
          <p className="text-sm">
            Chuyến bay {flightOffer.itineraries[0].segments[0].flightNumber}
          </p>
        </div>
        <img src={flighticon} alt="Logo hãng bay" className="h-10" />
      </div>

      {/* Thông tin hành khách */}
      <div className="p-4 bg-gray-100 text-gray-800">
        <p className="text-sm font-medium">Hành khách</p>
        <p className="text-lg font-bold">{`${traveler.firstName.toUpperCase()} ${traveler.lastName.toUpperCase()}`}</p>
        <p className="text-sm">Ngày sinh: {formatDate(traveler.dateOfBirth)}</p>
        <p className="text-sm">
          Liên hệ: {traveler.phoneNumber} | {traveler.email}
        </p>
      </div>

      {/* Hành trình */}
      {itineraries.map((itinerary, index) => (
        <div key={index} className="p-4 border-t border-gray-200">
          <h2 className="text-lg font-bold mb-2">
            {index === 0 ? "Chiều đi" : "Chiều về"}
          </h2>
          {itinerary.segments.map((segment, segIndex) => (
            <div key={segIndex} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">
                    {segment.departureIataCode}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(segment.departureTime)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatTime(segment.departureTime)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Thời gian bay</p>
                  <p className="font-medium">
                    {formatDuration(segment.duration)}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {segment.arrivalIataCode}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(segment.arrivalTime)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatTime(segment.arrivalTime)}
                  </p>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>Hãng bay: {segment.carrierCode}</p>
                <p>Số hiệu chuyến bay: {segment.flightNumber}</p>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* QR Code */}
      <div className="p-4 bg-gray-50 flex justify-center">
        <QRCode value={order.orderId} size={100} />
      </div>
    </div>
  );
};

export default Confirm;
