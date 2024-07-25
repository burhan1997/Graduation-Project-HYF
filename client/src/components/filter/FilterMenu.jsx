import React, { useState } from "react";
import "./FilterMenu.css";
import filterData from "./filterData.json";
import { MenuList } from "./MenuList";
import { GrClose } from "react-icons/gr";
import PropTypes from "prop-types";

export const FilterMenu = ({ onClose }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [value]: checked };
      return newFilters;
    });
    //   console.log("value", value);
  };

  return (
    <div className="menu-overlay" onClick={onClose}>
      <div className="menu-content" onClick={(e) => e.stopPropagation()}>
        <span className="x-icon" onClick={onClose}>
          <GrClose />
        </span>
        <h2 className="menu-header">Filter Menu </h2>
        {filterData.filter.map((filterCategory) => (
          <MenuList
            key={filterCategory.name}
            name={filterCategory.name}
            options={filterCategory.options}
            selectedOptions={selectedFilters}
            handleOptionChange={handleOptionChange}
          />
        ))}
        <button className="menu-button-2" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

FilterMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
};
