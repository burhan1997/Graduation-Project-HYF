import React, { useEffect, useContext, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { FormContext } from "../../context/xformContext";
import { useLocation } from "react-router-dom";
import { FormItem } from "./FormItem";
import "./Update-profile.css";
import { useFields } from "../../hooks/useFields";
import { useDefaultValues } from "../../hooks/useDefaultValues";

export const UpdateProfileForm = () => {
  const { user, userError } = useUser();
  const [fields, setFields] = useState();
  const {
    reset,
    watch,
    onSubmit,
    handleSubmit,
    isLoading,
    formState,
    register,
  } = useContext(FormContext);

  const location = useLocation();
  const pathName =
    location.pathname === "/create-profile" ? "Create" : "Update";

  const getDefaults = (user) => {
    const fields = useFields();
    setFields(fields);
    const defaultValues = useDefaultValues(user, fields);
    return defaultValues;
  };

  useEffect(() => {
    if (user) {
      const defaultValues = getDefaults(user);
      reset(defaultValues);
    }
  }, [user, reset]);

  const data = formState.defaultValues;
  if (!data) {
    return <p>Default data loading...</p>;
  }

  if (userError) {
    return <p>No user we found. You can sign in or sign up</p>;
  }

  const onSave = (data) => {
    const id = user._id;
    const method = "PUT";
    const pathName = `/user/update/${id}`;
    const updatedUser = { ...user, ...data };
    const body = {
      user: updatedUser,
    };
    onSubmit(body, method, pathName);
  };
  return (
    <div className="Profile-form">
      <header>
        <h1>{pathName} Profile</h1>
      </header>
      <form onSubmit={handleSubmit(onSave)}>
        {fields?.map((field, index) => (
          <FormItem
            key={index}
            field={field}
            watch={watch}
            register={register}
            defaultValue={formState.defaultValues[field.name]}
          />
        ))}
        <div className="submit">
          <button
            type="submit"
            className="Profile-form-button"
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
