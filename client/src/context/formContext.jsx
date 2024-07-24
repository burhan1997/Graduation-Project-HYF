import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useFetch from "../hooks/useFetch";
import { getToken } from "../config/getToken";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const { register, watch, reset, formState, handleSubmit } = useForm();
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    return () => cancelFetch();
  }, [cancelFetch]);

  const onReceived = (data) => {
    localStorage.setItem("token", data.token);
    // navigate("/profile");
  };

  const {
    isLoading,
    error: updateUserError,
    performFetch,
    cancelFetch,
  } = useFetch(pathName, onReceived);

  const onSubmit = (data, method, pathName) => {
    const token = getToken();
    setPathName(pathName);

    performFetch({
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <FormContext.Provider
      value={{
        formState,
        watch,
        register,
        reset,
        onSubmit,
        handleSubmit,
        isLoading,
        updateUserError,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
