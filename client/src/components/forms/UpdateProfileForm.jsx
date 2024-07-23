import React from "react";
import { useUser } from "../../hooks/useUser";
import { FormContext } from "../../context/FormContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { FormItem } from "./FormItem";
import "./Update-profile.css";
import { useEffect } from "react";
import { convertUserToFormData } from "../../util/convertUserToFormData";

export const UpdateProfileForm = () => {
  const { user, userError } = useUser();
  const { reset, handleSubmit, formState } = useContext(FormContext);

  useEffect(() => {
    if (!user) return;
    const sortedFormData = convertUserToFormData(user);
    reset(sortedFormData);
  }, [user]);

  const data = formState.defaultValues;
  if (!data) {
    return <p>Loading...</p>;
  }
  //console.log("data",data)

  if (userError) {
    return <p>No user we found. You can sign in or sign up</p>;
  }

  const location = useLocation();

  const pathName =
    location.pathname === "/create-profile" ? "Create" : "Update";

  const handleChange = (e) => {
    e?.preventDefault();
    // console.log("e",e.target);
  };

  //console.log("form Values",formData);
  //console.log("register values",register)
  //console.log("formState",formState);
  return (
    <div onSubmit={handleSubmit} className="Profile-form">
      <header>
        <h1>{pathName} Profile</h1>
        {/* <div>{loading&&<p>Loading ...</p>}</div> */}
      </header>
      <form>
        {data?.map((field) => (
          <FormItem
            key={field.name}
            field={field}
            handleChange={handleChange}
            register
          />
        ))}
        <div className="submit">
          <button
            type="submit"
            className="Profile-form-button"
            // disabled={isLoading}
          >
            {/* {isLoading ? "Submitting..." : "Submit"} */}
            Submit
          </button>

          {/* {fetchUserError && (
            <div className="error">{fetchUserError.toString()}</div>
          )} */}
        </div>
      </form>
    </div>
  );
};
