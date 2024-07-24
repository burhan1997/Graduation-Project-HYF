import React from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(({ type, placeholder, name, ...rest }, ref) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      ref={ref}
      {...rest}
    />
  );
});

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Input;
