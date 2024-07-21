import React from "react";
import PropTypes from "prop-types";
import Input from "./Input";

export const FormItem = ({
  inputClass,
  placeholder,
  isRequired,
  type,
  name,
  value,
  handleChange,
  label,
  formData,
  divClass,
  options,
  defaultValue,
  fieldLabel,
}) => {
  // Convert values to strings
  const stringValue = value ? String(value) : "";
  const stringDefaultValue = defaultValue ? String(defaultValue) : "";

  return (
    <div
      className={
        type === "number" || type === "date" ? "label-horizontal" : divClass
      }
    >
      {(type === "image" || type === "file") && (
        <img
          className="pro-img"
          src={
            "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
          }
          alt="Avatar"
        />
      )}
      {(type === "number" || type === "date") && fieldLabel && (
        <span className="label-span">{fieldLabel}</span>
      )}
      {type === "textarea" && (
        <textarea
          className={inputClass}
          name={name}
          value={stringValue}
          onChange={handleChange}
          required={isRequired}
          placeholder={placeholder}
        />
      )}
      {(type === "checkbox" || type === "radio") && options && (
        <>
          <label
            className={`${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}`}
          >
            {fieldLabel && fieldLabel}
          </label>
          <div
            className={`${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}-div`}
          >
            {options.map((option) => (
              <label
                key={option}
                className={`${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}`}
              >
                <Input
                  type="checkbox"
                  name={name}
                  value={option}
                  checked={formData[name]?.includes(option) || false}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        </>
      )}
      {(type === "text" || type === "date" || type === "number") && (
        <Input
          className={inputClass}
          type={type}
          name={name}
          value={stringValue || stringDefaultValue}
          onChange={handleChange}
          required={isRequired}
          placeholder={placeholder}
        />
      )}
      {label && <span>{label}</span>}
    </div>
  );
};

FormItem.propTypes = {
  labelClass: PropTypes.string,
  divClass: PropTypes.string,
  inputClass: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  formData: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.string),
    hobbies: PropTypes.arrayOf(PropTypes.string),
  }),
  options: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fieldLabel: PropTypes.string,
};
