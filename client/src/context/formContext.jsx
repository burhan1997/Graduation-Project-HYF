import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode"; // Correct import statement for jwt-decode
import { createFieldConfig } from "../config/createFieldConfig";
import { getToken } from "../config/getToken";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [profileCreated, setProfileCreated] = useState(false);
  // Define the order of fields
  const desiredOrder = [
    "profile_picture",
    "firstName",
    "lastName",
    "location",
    "bio",
    "birthday",
    "gender",
    "preferred_gender",
    "min_age_preference",
    "max_age_preference",
    "max_distance_preference",
    "hobbies",
    "languages",
  ];

  const onReceivedUser = (data) => {
    const user = data.user;

    // Create field configurations
    const fieldConfigs = Object.entries(user)
      .map(([key, value]) => createFieldConfig(key, value))
      .filter((config) => config !== null);

    // Create a map for quick lookup
    const sortedFormData = desiredOrder
      .map((name) => fieldConfigs.find((field) => field.name === name))
      .filter((field) => field !== undefined); // Remove undefined fields
    // Remove undefined fields

    setFormData(sortedFormData);
  };

  const { performFetch: fetchUsers, error: fetchUserError } = useFetch(
    `/user/${userId}`,
    onReceivedUser,
  );

  useEffect(() => {
    const token = getToken();

    if (token) {
      const decodedToken = jwtDecode(token);

      const newUserId = decodedToken.id;
      setUserId(newUserId); // Update userId in state
      // Fetch user data if userId is available
      fetchUsers({
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }, [userId]); // Re-run effect if fetchUsers changes

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        fetchUserError,
        profileCreated,
        setProfileCreated,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
