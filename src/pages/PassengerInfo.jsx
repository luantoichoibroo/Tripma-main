import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PassengerInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const travelerPricings =
    location.state?.selectedPriceData.data.flightOffers[0].travelerPricings ||
    [];
  const selectedPriceData = location.state?.selectedPriceData.data;
  const [travelers, setTravelers] = useState([]);
  const [travelersType, setTravelersType] = useState([]);

  useEffect(() => {
    if (travelers.length === 0 && travelerPricings.length > 0) {
      const initialTravelers = travelerPricings.map((_, index) => ({
        id: (index + 1).toString(),
        dateOfBirth: "",
        name: { firstName: "", lastName: "" },
        gender: "MALE",
        contact: {
          emailAddress: "",
          phones: [
            {
              deviceType: "MOBILE",
              countryCallingCode: "84",
              number: "",
            },
          ],
        },
        documents: [
          {
            documentType: "PASSPORT",
            birthPlace: "VIETNAM",
            issuanceLocation: "VN",
            issuanceDate: "",
            number: "",
            expiryDate: "",
            issuanceCountry: "VN",
            validityCountry: "VN",
            nationality: "VN",
            holder: true,
          },
        ],
      }));
      const travelersType = travelerPricings.map(
        (item, index) => item.travelerType
      );
      setTravelersType(travelersType);
      setTravelers(initialTravelers);
    }
  }, [travelerPricings]);

  const handleChange = (index, field, value) => {
    const updatedTravelers = [...travelers];
    updatedTravelers[index][field] = value;
    setTravelers(updatedTravelers);
  };

  const handleDocumentChange = (index, field, value) => {
    const updatedTravelers = [...travelers];
    updatedTravelers[index].documents[0][field] = value;
    setTravelers(updatedTravelers);
  };

  const handleSeatClick = () => {
    navigate("/payment", {
      state: {
        flightSelected: selectedPriceData,
        travelers: travelers,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Nhập thông tin hành khách
      </h2>
      {travelers.map((traveler, index) => (
        <div key={traveler.id} className="border p-4 mb-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Hành khách {travelersType[index]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Họ"
              className="p-2 border rounded w-full uppercase"
              value={traveler.name.lastName}
              onChange={(e) =>
                handleChange(index, "name", {
                  ...traveler.name,
                  lastName: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Tên"
              className="p-2 border rounded w-full uppercase"
              value={traveler.name.firstName}
              onChange={(e) =>
                handleChange(index, "name", {
                  ...traveler.name,
                  firstName: e.target.value,
                })
              }
            />
            <div>
              <label>Ngày sinh</label>
              <input
                type="date"
                className="p-2 border rounded w-full"
                value={traveler.dateOfBirth}
                onChange={(e) =>
                  handleChange(index, "dateOfBirth", e.target.value)
                }
              />
            </div>
            <div>
              <label>Giới tính</label>
              <select
                className="p-2 border rounded w-full"
                value={traveler.gender}
                onChange={(e) => handleChange(index, "gender", e.target.value)}
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
              </select>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded w-full"
              value={traveler.contact.emailAddress}
              onChange={(e) =>
                handleChange(index, "contact", {
                  ...traveler.contact,
                  emailAddress: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              className="p-2 border rounded w-full"
              value={traveler.contact.phones[0].number}
              onChange={(e) =>
                handleChange(index, "contact", {
                  ...traveler.contact,
                  phones: [
                    { ...traveler.contact.phones[0], number: e.target.value },
                  ],
                })
              }
            />
          </div>

          <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
            Thông tin hộ chiếu
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Ngày cấp:</label>
              <input
                type="date"
                className="p-2 border rounded w-full"
                placeholder="Ngày cấp hộ chiếu"
                value={traveler.documents[0].issuanceDate}
                onChange={(e) =>
                  handleDocumentChange(index, "issuanceDate", e.target.value)
                }
              />
            </div>
            <div>
              <label>Ngày hết hạn:</label>
              <input
                type="date"
                className="p-2 border rounded w-full"
                placeholder="Ngày hết hạn hộ chiếu"
                value={traveler.documents[0].expiryDate}
                onChange={(e) =>
                  handleDocumentChange(index, "expiryDate", e.target.value)
                }
              />
            </div>
            <input
              type="text"
              className="p-2 border rounded w-full"
              placeholder="Số hộ chiếu"
              value={traveler.documents[0].number}
              onChange={(e) =>
                handleDocumentChange(index, "number", e.target.value)
              }
            />
          </div>
        </div>
      ))}
      <button
        onClick={handleSeatClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Tiếp tục
      </button>
    </div>
  );
}
