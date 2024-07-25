import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FilterMenu } from "./FilterMenu";
import "./FilterForm.css";

export const FilterForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  if (isOpen) {
    return <FilterMenu onClose={() => setIsOpen(false)} />;
  }
  return (
    <div className="filter-form">
      <button onClick={setIsOpen}>
        <FaFilter />
      </button>
    </div>
  );
};
