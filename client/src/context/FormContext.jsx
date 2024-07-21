import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { token } from "../config/token";
import { jwtDecode } from "jwt-decode";
import { createFieldConfig } from "../config/createFieldConfig";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const userId = token ? jwtDecode(token).user._id : null;
  const [formData, setFormData] = useState([]);

  // Define the order of fields
  const desiredOrder = [
    "profile_picture",
    "firstname",
    "lastname",
    "bio",
    "birthday",
    "gender",
    "hobbies",
    "languages",
  ];

  const onReceivedUser = (data) => {
    const user = data.user;

    // Create field configurations
    const fieldConfigs = Object.entries(user)
      .map(([key, value]) => createFieldConfig(key, value))
      .filter((config) => config !== null);

    // Sort fields based on desiredOrder
    const sortedFormData = desiredOrder
      .map((name) => fieldConfigs.find((field) => field.name === name))
      .filter((field) => field !== undefined); // Remove undefined fields

    setFormData(sortedFormData);
  };

  const { performFetch: fetchUsers, error: fetchUserError } = useFetch(
    `/user/${userId}`,
    onReceivedUser,
  );

  useEffect(() => {
    if (userId) {
      fetchUsers({
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }, [userId]);

  return (
    <FormContext.Provider value={{ formData, setFormData, fetchUserError }}>
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
