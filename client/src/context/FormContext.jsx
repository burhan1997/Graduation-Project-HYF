import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    gender: "",
    bio: "",
    hobbies: [],
    languages: [],
    minAge: 18,
    maxAge: 99,
    maxDistance: 50,
    preferredGender: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
