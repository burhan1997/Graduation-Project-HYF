import React from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import "./FormItem.css";

export const FormItem = ({ field, register, watch }) => {
  const { type, placeholder, name, fieldLabel, options } = field;
  const newObje = watch();

  const isChecked = (option) => {
    const newArray = newObje?.[name];

    if (Array.isArray(newArray)) {
      return newArray.includes(option);
    } else {
      return newObje?.[name] === option;
    }
  };
  const renderField = () => {
    switch (type) {
      case "text":
      case "number":
      case "date":
        return (
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            {...register(name)}
          />
        );
      case "textarea":
        return (
          <textarea
            id={name}
            className={name}
            placeholder={placeholder}
            {...register(name)}
          />
        );
      case "image":
        return <img className="pro-img" alt={name} />;
      case "checkbox":
      case "radio":
        return (
          <div className="options">
            {options?.map((option) => (
              <div key={option} className="options-label">
                <label key={option}>{option} </label>
                <input
                  type={type}
                  className={"options-input"}
                  checked={isChecked(option)}
                  value={option}
                  {...register(name)}
                />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={
        field.type == "number"
          ? "Profile-form-input label-horizontal"
          : "Profile-form-input"
      }
    >
      {fieldLabel && <label htmlFor={name}>{fieldLabel}</label>}
      {renderField()}
    </div>
  );
};

FormItem.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    fieldLabel: PropTypes.string,
    options: PropTypes.array,
  }).isRequired,
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
};
