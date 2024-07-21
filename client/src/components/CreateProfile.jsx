import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useFetch from "../hooks/useFetch";
import "./Create-profile.css";
import { Label } from "./Label";
import { formConfig } from "../config/formConfig";
import { FormContext } from "../context/FormContext";

const CreateProfile = () => {
  const { formData, setFormData } = useContext(FormContext);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const userId = token ? jwtDecode(token).user.id : null;

  const onReceivedUser = (data) => {
    const user = data.user;
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      birthday: user?.birthday
        ? new Date(user.birthday).toISOString().split("T")[0]
        : "",
      gender: user?.gender || "",
      bio: user?.bio || "",
      hobbies: user?.hobbies || [],
      languages: user?.languages || [],
      minAge: user?.min_age_preference || 18,
      maxAge: user?.max_age_preference || 99,
      maxDistance: user?.max_distance_preference || 50,
      preferredGender: user?.preferred_gender || "",
    });
  };

  const { performFetch: fetchUsers, error: fetchUserError } = useFetch(
    `/user/${userId}`,
    onReceivedUser,
  );

  useEffect(() => {
    if (userId) {
      fetchUsers({ method: "GET" });
    }
  }, [userId]);

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
      body: formData,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="Profile-form">
      <span className="Profile-message">Create your Profile</span>
      <span className="Profile-message2">Edit your info</span>
      <img
        className="pro-img"
        src="https://img.freepik.com/free-vector/find-person-job-opportunity_24877-63457.jpg?t=st=1721404799~exp=1721408399~hmac=a69e5980601bdb8591f2910deb73711c70d79597d5e60b1f0b578a588416e67f&w=740"
        alt="Avatar"
      />
      {formConfig.map((field, index) => (
        <Label
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
        {fetchProfileError && <div className="error">{fetchProfileError}</div>}
        {fetchUserError && <div className="error">{fetchUserError}</div>}
      </div>
    </form>
  );
};

export default CreateProfile;
