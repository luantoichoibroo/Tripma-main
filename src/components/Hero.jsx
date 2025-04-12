import { departure, arrival, calendar, person } from "../assets/icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { suggestions } from "../data/constant";

const AutoSuggest = (initialValue) => {
  const [input, setInput] = useState("");
  const [matchingSuggestions, setMatchingSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleInputChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setInput(inputValue);
    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.city_name.toLowerCase().startsWith(inputValue)
    );
    setMatchingSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    const value = `${suggestion.city_name} (${suggestion.iata_Code})`;
    setInput(value);
    setIsOpen(false);
  };

  return {
    input,
    matchingSuggestions,
    isOpen,
    setInput,
    setIsOpen,
    handleInputChange,
    handleSuggestionClick,
  };
};

const Hero = () => {
  const navigate = useNavigate();
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [tripType, setTripType] = useState("one-way"); // Để kiểm tra kiểu chuyến bay

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    minor: 0,
  });

  const handleOptions = (name, oparetion) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: oparetion === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const extractIataCode = (value) => {
      const regex = /\(([^)]+)\)/;
      const match = value.match(regex);
      return match ? match[1] : "";
    };

    const originIata = extractIataCode(departureSuggest.input);
    const destinationIata = extractIataCode(arrivalSuggest.input);

    // Nếu là một chiều, gửi ngày về là null
    const returnDate =
      tripType === "round-trip" ? format(date[0].endDate, "yyyy-MM-dd") : null;

    navigate("/explore", {
      state: {
        origin: originIata,
        destination: destinationIata,
        departureDate: format(date[0].startDate, "yyyy-MM-dd"),
        returnDate: returnDate,
        adult: options.adult,
        minor: options.minor,
      },
    });
  };

  const departureSuggest = AutoSuggest("");
  const arrivalSuggest = AutoSuggest("");

  const handleTripTypeChange = (event) => {
    const tripType = event.target.value;
    setTripType(tripType);

    if (tripType === "one-way") {
      // Nếu chọn một chiều, xóa giá trị ngày về
      setDate([
        {
          startDate: date[0].startDate,
          endDate: null, // Ngày về không có
          key: "selection",
        },
      ]);
    } else {
      // Nếu chọn khứ hồi, đảm bảo có ngày về hợp lệ
      setDate([
        {
          startDate: date[0].startDate,
          endDate: date[0].endDate || new Date(), // Đảm bảo có giá trị ngày về
          key: "selection",
        },
      ]);
    }
  };

  const handleDateChange = (item) => {
    setDate([item.selection]);

    // Nếu có cả ngày đi và ngày về, tự động chuyển sang "Khứ hồi"
    if (item.selection.endDate) {
      setTripType("round-trip");
    } else {
      // Nếu không có ngày về (chọn "Một chiều"), vẫn giữ "Một chiều"
      setTripType("one-way");
    }
  };

  return (
    <>
      <header className="flex flex-col items-center relative w-full h-[529px] px-7 py-4">
        <div className="flex justify-center items-center">
          <h1 className="font-extrabold text-5xl sm:text-7xl md:text-8xl text-center leading-[55px] sm:leading-[70px] md:leading-[90px] text-gradient">
            Du lịch gì chưa <br /> người đẹp
          </h1>
        </div>

        <div className="flex w-full max-w-[1024px] lg:h-[65px] lg:flex-row items-center flex-col mt-20 shadowCard relative ">
          <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2 lg:rounded-l-[4px] relative">
            <img src={departure} alt="departure" />
            <input
              type="text"
              placeholder="Điểm đi"
              value={departureSuggest.input}
              onChange={departureSuggest.handleInputChange}
              onFocus={() => departureSuggest.setIsOpen(true)}
              className="uppercase placeholder:capitalize outline-none border-none ml-2 text-base text-[#7C8DB0] placeholder:text-[#7C8DB0] placeholder:text-base placeholder:leading-6"
            />
            {departureSuggest.isOpen && (
              <ul className="w-[220px] h-56 absolute top-[70px] bg-white rounded overflow-scroll">
                {departureSuggest.matchingSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.iata_Code}
                    onClick={() =>
                      departureSuggest.handleSuggestionClick(suggestion)
                    }
                    className="uppercase cursor-pointer hover:bg-[#605DEC] px-3 py-1 text-[#7C8DB0] hover:text-[#F6F6FE] mt-1"
                  >
                    {suggestion.city_name} ({suggestion.iata_Code}){" "}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
            <img src={arrival} alt="arrival" />
            <input
              type="text"
              placeholder="Điểm đến"
              value={arrivalSuggest.input}
              onChange={arrivalSuggest.handleInputChange}
              onFocus={() => arrivalSuggest.setIsOpen(true)}
              className="uppercase placeholder:capitalize outline-none border-none ml-2 text-base text-[#7C8DB0] placeholder:text-[#7C8DB0] placeholder:text-base placeholder:leading-6"
            />
            {arrivalSuggest.isOpen && (
              <ul className="w-[220px] h-56 absolute top-[70px] bg-white rounded overflow-scroll">
                {arrivalSuggest.matchingSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.iata_Code}
                    onClick={() =>
                      arrivalSuggest.handleSuggestionClick(suggestion)
                    }
                    className="uppercase cursor-pointer hover:bg-[#605DEC] px-3 py-1 text-[#7C8DB0] hover:text-[#F6F6FE]  mt-1"
                  >
                    {suggestion.city_name} ({suggestion.iata_Code}){" "}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Thêm Select cho Khứ hồi/Một chiều */}
          <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
            <select
              value={tripType}
              onChange={handleTripTypeChange}
              className="w-full h-full text-[#7C8DB0] bg-white outline-none"
            >
              <option value="one-way">Một chiều</option>
              <option value="round-trip">Khứ hồi</option>
            </select>
          </div>

          <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
            <img src={calendar} alt="calendar" />
            <span
              className="text-[#7C8DB0] text-base leading-6 ml-2 cursor-pointer"
              onClick={() => setOpenDate(!openDate)}
            >
              {openDate
                ? `${format(date[0].startDate, "dd/MM/yyyy")} to ${
                    tripType === "round-trip" && date[0].endDate
                      ? format(date[0].endDate, "dd/MM/yyyy")
                      : ""
                  }`
                : "Ngày đi -> Ngày về"}
            </span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange} // Cập nhật logic khi thay đổi ngày
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="absolute top-64 lg:top-20 z-10 "
                minDate={new Date()} // Đảm bảo không có ngày quá khứ
              />
            )}
          </div>

          <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6]  p-2">
            <img src={person} alt="person" />
            <span
              className="text-[#7C8DB0] text-base leading-6 ml-2 cursor-pointer"
              onClick={() => setOpenOptions(!openOptions)}
            >
              {`${options.adult} Người lớn - ${options.minor} Trẻ em `}
            </span>
            {openOptions && (
              <div className="w-52 h-fit flex flex-col gap-4 rounded-md bg-white shadowCard absolute lg:top-[70px] top-64 p-4 z-10">
                <div className="flex justify-between items-center">
                  <span className="text-[#7C8DB0] text-base leading-6">
                    Adults:
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      className="border-2 border-[#605DEC] px-2 text-[#7C8DB0] disabled:cursor-not-allowed"
                      onClick={() => handleOptions("adult", "d")}
                      disabled={options.adult <= 1}
                    >
                      -
                    </button>
                    <span className="text-[#7C8DB0]">{options.adult}</span>
                    <button
                      className="border-2 border-[#605DEC] px-2 text-[#7C8DB0]"
                      onClick={() => handleOptions("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#7C8DB0] text-base leading-6">
                    Minors:
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      className="border-2 border-[#605DEC] px-2 text-[#7C8DB0] disabled:cursor-not-allowed"
                      onClick={() => handleOptions("minor", "d")}
                      disabled={options.minor <= 0}
                    >
                      -
                    </button>
                    <span className="text-[#7C8DB0]">{options.minor}</span>
                    <button
                      className="border-2 border-[#605DEC] px-2 text-[#7C8DB0]"
                      onClick={() => handleOptions("minor", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-[#605DEC] text-[#FAFAFA] text-lg leading-6 h-[45px] lg:h-[65px] px-5 lg:rounded-r-[4px]"
          >
            Tìm kiếm
          </button>
        </div>
      </header>
    </>
  );
};

export default Hero;
