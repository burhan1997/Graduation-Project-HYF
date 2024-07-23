import React from "react";
import PropTypes from "prop-types";
import Input from "../Input";

export const FormItem = ({
  field,
  //isRequired,
  handleChange,
}) => {
  // Convert values to strings
  //console.log("field",field);
  const { type, placeholder, name, fieldLabel, options } = field;
  const value = field?.name;

  /// console.log("value",value);
  //console.log("label",fieldLabel);

  return (
    <div className={"Profile-form-input"}>
      {type === "image" && (
        <img
          className="pro-img"
          src={
            "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
          }
          alt="Avatar"
        />
      )}
      <Input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {options && (
        <div className={"label-div"}>
          <label>{fieldLabel}</label>
          <div
            className={`${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}-div`}
          >
            {options.map((option) => (
              <label key={option}>
                <Input
                  type={type}
                  name={name}
                  value={option}
                  checked={field[name]?.includes(option) || false}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>

    //   {(type === "image" || type === "file") && (
    //     <img
    //       className="pro-img"
    //       src={
    //         "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
    //       }
    //       alt="Avatar"
    //     />
    //   )}
    //   {( type === "number" || type === "date") && fieldLabel && (
    //     <span className="label-span">{fieldLabel}</span>
    //   )}
    //   {type === "textarea" && (
    //     <Input
    //     type="textarea"
    //       className={className}
    //       name={name}
    //       value={""}
    //       onChange={handleChange}

    //       placeholder={placeholder}
    //     />
    //   )}
    //   {(type === "checkbox" || type === "radio") && options && (
    //     <>
    //       <label
    //         className={`${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}`}
    //       >
    //         {fieldLabel && fieldLabel}
    //       </label>
    //       <div
    //         className={`${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}-div`}
    //       >
    //         {options.map((option) => (
    //           <label
    //             key={option}
    //             className={`${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}`}
    //           >
    //             <Input
    //               type={type}
    //               name={name}
    //               value={option}
    //               checked={field[name]?.includes(option) || false}
    //               onChange={handleChange}
    //             />
    //             {option}
    //           </label>
    //         ))}
    //       </div>
    //     </>
    //   )}
    //   {(type === "text" || type === "date" || type === "number") && (
    //     <Input
    //       className={className}
    //       type={type}
    //       name={name}
    //       value={value}
    //       onChange={handleChange}
    //       required={isRequired}
    //       placeholder={placeholder}
    //     />
    //   )}
    //  {/* {label && <span>{label}</span>} */}
    // </div>
  );
};

FormItem.propTypes = {
  field: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
