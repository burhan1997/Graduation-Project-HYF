import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./Create-profile.css";
import { FormContext } from "../context/FormContext";
import { token } from "../config/Token";
import { FormItem } from "./FormItem";
import { jwtDecode } from "jwt-decode";

const CreateProfile = () => {
  const { formData, setFormData, fetchUserError } = useContext(FormContext);
  const userId = token ? jwtDecode(token).user._id : null;
  const navigate = useNavigate();
  const location = useLocation();
  const onReceivedProfile = (data) => {
    localStorage.setItem("token", data.token);
    navigate("/profile");
  };

  const {
    isLoading,
    error: fetchProfileError,
    performFetch: performProfileFetch,
    cancelFetch,
  } = useFetch(`/user/update/${userId}`, onReceivedProfile);

  useEffect(() => {
    return () => cancelFetch();
  }, [cancelFetch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const isGenderField = name === "gender" || name === "preferredGender";

        if (isGenderField) {
          return {
            ...prevData,
            [name]: checked ? value : "",
          };
        } else {
          return {
            ...prevData,
            [name]: checked
              ? [...prevData[name], value]
              : prevData[name].filter((item) => item !== value),
          };
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "number" ? parseInt(value, 10) : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      return;
    }
    performProfileFetch({
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
  };
  const currentTitle =
    location.pathname === "/create-profile"
      ? "Create your Profile"
      : "Update your Profile";

  return (
    <form onSubmit={handleSubmit} className="Profile-form">
      <span className="Profile-message">{currentTitle}</span>
      <span className="Profile-message2">Edit your info</span>
      {formData.map((field, index) => (
        <FormItem
          key={index}
          type={field.type}
          name={field.name}
          value={formData[field.name]}
          placeholder={field.placeholder}
          handleChange={handleChange}
          divClass="label-div"
          labelClass="label-div"
          inputClass={
            field.type === "textarea"
              ? "bio"
              : field.type === "date" || field.type === "number"
                ? "label-div"
                : "Profile-form-input"
          }
          options={field.options}
          defaultValue={field.defaultValue}
          formData={formData}
          fieldLabel={field.fieldLabel}
        />
      ))}
      <div className="submit">
        <button
          type="submit"
          className="Profile-form-button"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
        {fetchProfileError && (
          <div className="error">{fetchProfileError.toString()}</div>
        )}
        {fetchUserError && (
          <div className="error">{fetchUserError.toString()}</div>
        )}
      </div>
    </form>
  );
};

export default CreateProfile;
