import { useState } from "react";

const SelectDetails = ({ onSortOptionsChange }) => {
  const handleSortChange = (e) => {
    const { name, value } = e.target;
    onSortOptionsChange(name, value); // Truyền thông tin sắp xếp lên component cha
  };

  return (
    <div className="flex flex-wrap items-center justify-start gap-3">
      {/* Combobox sắp xếp giá */}
      <select
        name="price"
        onChange={handleSortChange}
        className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-2 cursor-pointer"
      >
        <option value="">Sắp xếp theo giá</option>
        <option value="asc">Giá tăng dần</option>
        <option value="desc">Giá giảm dần</option>
      </select>

      {/* Combobox sắp xếp thời gian */}
      <select
        name="time"
        onChange={handleSortChange}
        className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-2 cursor-pointer"
      >
        <option value="">Sắp xếp theo thời gian</option>
        <option value="earliest">Chuyến bay sớm nhất</option>
        <option value="latest">Chuyến bay muộn nhất</option>
      </select>
    </div>
  );
};

export default SelectDetails;
