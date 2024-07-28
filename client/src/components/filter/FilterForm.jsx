import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FilterMenu } from "./FilterMenu";
import filterData from "./filterData.json";
import PropTypes from "prop-types";
import "./FilterForm.css";
import { getActiveFilters } from "../../util/getActiveFilters";

export const FilterForm = ({ setUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;

    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [value]: checked };

      const userFilters = getActiveFilters(newFilters);
      const queryString = new URLSearchParams({
        filters: JSON.stringify(userFilters),
      }).toString();
      const newUrl = `/user?${queryString}`;
      setUrl(newUrl);
      return newFilters;
    });
  };

  if (isOpen) {
    return (
      <FilterMenu
        onClose={() => setIsOpen(false)}
        filterData={filterData}
        handleOptionChange={handleOptionChange}
        selectedFilters={selectedFilters}
      />
    );
  }

  return (
    <div className="filter-form">
      <button onClick={() => setIsOpen(true)}>
        <FaFilter />
      </button>
    </div>
  );
};
FilterForm.propTypes = {
  setUrl: PropTypes.func.isRequired,
  performFetch: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
