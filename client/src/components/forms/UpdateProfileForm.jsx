import React, { useEffect, useContext, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { FormContext } from "../../context/formContext";
import { useLocation } from "react-router-dom";
import { FormItem } from "./FormItem";
import "./UpdateProfile.css";
import { useFields } from "../../hooks/useFields";
import { useDefaultValues } from "../../hooks/useDefaultValues";
import { useSchema } from "../../hooks/useSchema";
export const UpdateProfileForm = () => {
  const { user, userError } = useUser();
  const [isEdit, setIsEdit] = useState(true);

  const [fields, setFields] = useState();
  const {
    reset,
    watch,
    onSubmit,
    handleSubmit,
    isLoading,
    formState,
    setSchema,
    register,
    updateUserError,
    setUserPathName,
  } = useContext(FormContext);

  const location = useLocation();
  const pathName =
    location.pathname === "/create-profile" ? "Create" : "Update";

  useEffect(() => {
    if (user) {
      const fields = useFields();
      const schema = useSchema();
      setSchema(schema["user"]);
      setFields(fields["user"]);
      const defaultValues = useDefaultValues(user, fields["user"]);

      reset(defaultValues);
      const id = user._id;
      const pathName = `/user/update/${id}`;
      setUserPathName(pathName);
    }
  }, [user, reset]);

  //console.log("updated user", user);
  const data = formState.defaultValues;
  if (!data) {
    return <p>Default data loading...</p>;
  }

  if (userError) {
    return <p>No user we found. You can sign in or sign up</p>;
  }

  const onSave = (data) => {
    const method = "PUT";
    const body = {
      user: data,
    };
    onSubmit(body, method);
    setIsEdit(false);
  };

  return (
    <div className="Profile-form">
      <header>
        <h1>{pathName} Profile</h1>
      </header>
      <form onSubmit={handleSubmit(onSave)}>
        {Object.values(fields || {})?.map((field, index) => (
          <FormItem
            key={index}
            field={field}
            watch={watch}
            isEdit={isEdit}
            register={register}
            defaultValue={formState.defaultValues[field.name]}
          />
        ))}
        {isEdit ? (
          <div className="Button-group">
            <button onClick={() => setIsEdit(false)}>Cancel</button>
            <button
              type="submit"
              className="Profile-form-button"
              disabled={isLoading}
            >
              {isLoading ? <p>Loading ...</p> : <p>Save</p>}
            </button>
          </div>
        ) : (
          <button onClick={() => setIsEdit(true)}>Edit</button>
        )}

        <div>
          {updateUserError && (
            <div className="error">{updateUserError.toString()}</div>
          )}
        </div>
      </form>
    </div>
  );
};
