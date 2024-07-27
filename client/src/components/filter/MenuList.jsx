import React from "react";
import PropTypes from "prop-types";
import "./MenuList.css";
import { MenuItem } from "./MenuItem";

export const MenuList = ({
  name,
  options,
  selectedOptions,
  handleOptionChange,
}) => {
  return (
    <div className="menu-list">
      <h3>{name}</h3>
      <div className="menu-list-options-container">
        {options.map((option) => (
          <MenuItem
            key={option.value}
            name={option.name}
            value={option.value}
            checked={!!selectedOptions[option.value]}
            handleChange={handleOptionChange}
          />
        ))}
      </div>
    </div>
  );
};

MenuList.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedOptions: PropTypes.object.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
};
