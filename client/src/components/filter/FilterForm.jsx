import React, { useState, useContext } from "react";
import { FaFilter } from "react-icons/fa";
import { FilterMenu } from "./FilterMenu";
import filterData from "./filterData.json";
import "./FilterForm.css";
import { getActiveFilters } from "../../util/getActiveFilters";
import { UsersContext } from "../../context/usersContext";

export const FilterForm = () => {
  const { setUrl, users } = useContext(UsersContext);
  // Hobbies
  const hobbies = users?.map((user) => user.hobbies).flat();
  const uniqueHobbies = [...new Set(hobbies)];

  // Cities
  const cities = users
    ?.map((user) => user?.location?.map((location) => location.city))
    .flat();
  const uniqueCities = [...new Set(cities)];

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
        hobbies={uniqueHobbies}
        locations={uniqueCities}
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
