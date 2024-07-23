import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const { register, reset, formState, handleSubmit } = useForm();

  const onSubmit = () => {
    //console.log("submit data",data);
  };

  return (
    <FormContext.Provider
      value={{ formState, register, reset, onSubmit, handleSubmit }}
    >
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
