import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { travelerSchema } from "../validation/validationSchema";

export default function PassengerInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPriceData = location.state?.selectedPriceData?.data;
  const travelerPricings =
    selectedPriceData?.flightOffers[0]?.travelerPricings || [];

  const [travelersType, setTravelersType] = useState([]);
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

  useEffect(() => {
    const travelerTypes = travelerPricings.map((item) => item.travelerType);
    setTravelersType(travelerTypes);
  }, [travelerPricings]);

  const handleSubmit = (values) => {
    navigate("/payment", {
      state: {
        flightSelected: selectedPriceData,
        travelers: values.travelers,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Nhập thông tin hành khách
      </h2>

      <Formik
        initialValues={{ travelers: initialTravelers }}
        validationSchema={travelerSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="travelers">
              {() =>
                values.travelers.map((traveler, index) => (
                  <div
                    key={index}
                    className="border p-4 mb-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Hành khách {travelersType[index] || `#${index + 1}`}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Field
                          name={`travelers[${index}].name.lastName`}
                          type="text"
                          placeholder="Họ"
                          className="p-2 border rounded w-full uppercase"
                        />
                        <ErrorMessage
                          name={`travelers[${index}].name.lastName`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <Field
                          name={`travelers[${index}].name.firstName`}
                          type="text"
                          placeholder="Tên"
                          className="p-2 border rounded w-full uppercase"
                        />
                        <ErrorMessage
                          name={`travelers[${index}].name.firstName`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label>Ngày sinh</label>
                        <Field
                          type="date"
                          name={`travelers[${index}].dateOfBirth`}
                          className="p-2 border rounded w-full"
                        />
                        <ErrorMessage
                          name={`travelers[${index}].dateOfBirth`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label>Giới tính</label>
                        <Field
                          as="select"
                          name={`travelers[${index}].gender`}
                          className="p-2 border rounded w-full"
                        >
                          <option value="MALE">Nam</option>
                          <option value="FEMALE">Nữ</option>
                        </Field>
                        <ErrorMessage
                          name={`travelers[${index}].gender`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <Field
                          name={`travelers[${index}].contact.emailAddress`}
                          type="email"
                          placeholder="Email"
                          className="p-2 border rounded w-full"
                        />
                        <ErrorMessage
                          name={`travelers[${index}].contact.emailAddress`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <Field
                          name={`travelers[${index}].contact.phones[0].number`}
                          type="text"
                          placeholder="Số điện thoại"
                          className="p-2 border rounded w-full"
                        />
                        <ErrorMessage
                          name={`travelers[${index}].contact.phones[0].number`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                      Thông tin hộ chiếu
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label>Ngày cấp:</label>
                        <Field
                          name={`travelers[${index}].documents[0].issuanceDate`}
                          type="date"
                          className="p-2 border rounded w-full"
                        />
                        <ErrorMessage
                          name={`travelers[${index}].documents[0].issuanceDate`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <label>Ngày hết hạn:</label>
                        <Field
                          name={`travelers[${index}].documents[0].expiryDate`}
                          type="date"
                          className="p-2 border rounded w-full"
                        />
                        <ErrorMessage
                          name={`travelers[${index}].documents[0].expiryDate`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <Field
                          name={`travelers[${index}].documents[0].number`}
                          type="text"
                          placeholder="Số hộ chiếu"
                          className="p-2 border rounded w-full"
                        />
                        <ErrorMessage
                          name={`travelers[${index}].documents[0].number`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))
              }
            </FieldArray>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
            >
              Tiếp tục
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
