import React from "react";
import PropTypes from "prop-types";
import "./FormItem.css";
import { formatDate } from "../../util/formatData";

export const FormItem = ({ field, register, watch, isEdit }) => {
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
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className={"Profile-form-input"}
            value={
              type === "date" && !isEdit
                ? formatDate(newObje[name])
                : newObje[name]
            }
            readOnly={!isEdit}
          />
        );
      case "textarea":
        return (
          <textarea
            id={name}
            placeholder={placeholder}
            {...register(name)}
            className={"Profile-form-input-bio"}
            readOnly={!isEdit}
          />
        );
      case "image":
        if (isEdit) {
          return (
            <input type="text" placeholder={placeholder} {...register(name)} />
          );
        } else {
          return (
            <img
              src={newObje[name]}
              {...register(name)}
              className="pro-img"
              alt={"Profile picture is not available"}
            />
          );
        }
      case "location":
        if (isEdit) {
          return (
            <select
              id={name}
              className={name}
              {...register(name)}
              defaultValue={newObje[name]?.city}
            >
              <option value="">Select a location</option>
              {options?.map((option, index) => (
                <option key={index} value={index}>
                  {option.city}
                </option>
              ))}
            </select>
          );
        } else {
          return <span className="default-value">{newObje[name]?.city}</span>;
        }
      case "checkbox":
      case "radio":
        if (isEdit) {
          return (
            <div className="options">
              {options?.map((option) => (
                <div key={option} className="options-label">
                  <span>{option} </span>
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
        } else {
          const defaultValue = newObje?.[name];
          if (Array.isArray(defaultValue)) {
            return (
              <div className="default-values">
                {defaultValue.map((value) => (
                  <span key={value} className="default-value">
                    {value}
                  </span>
                ))}
              </div>
            );
          } else {
            return <span className="default-value">{defaultValue}</span>;
          }
        }
      default:
        return null;
    }
  };

  return (
    <div className="Profile-form-input">
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
  isEdit: PropTypes.bool.isRequired,
};
