import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import jwtDecode from "jwt-decode";
import "./Create-profile.css";
const CreateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    bio: "",
    hobbies: [],
    languages: [],
    minAge: 18,
    maxAge: 99,
    maxDistance: 50,
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // Extract user ID from token if available
  const userId = token ? jwtDecode(token).user.id : null;
  const onReceived = (data) => {
    localStorage.setItem("token", data.token);
    navigate("/profile");
  };
  // Initialize useFetch with dynamic URL
  const {
    isLoading,
    error: fetchError,
    performFetch,
    cancelFetch,
  } = useFetch(`/users/${userId}`, onReceived);
  useEffect(() => {
    return () => cancelFetch();
  }, [cancelFetch]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure userId is valid
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    // Format formData for POST request
    performFetch({
      method: "POST",
      body: formData,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="Profile-form">
      <span className="Profile-message">Create your Profile</span>
      <span className="Profile-message2">Edit your info </span>
      <img
        className="pro-img"
        src="https://img.freepik.com/free-vector/find-person-job-opportunity_24877-63457.jpg?t=st=1721404799~exp=1721408399~hmac=a69e5980601bdb8591f2910deb73711c70d79597d5e60b1f0b578a588416e67f&w=740"
        alt="Avatar"
      />
      <div className="label-div">
        <label className="label-div">
          <input
            className="Profile-form-input"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="label-div">
        <label className="label-div">
          <input
            className="Profile-form-input"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="label-div">
        <label className="label-div">
          <input
            className="Profile-form-input"
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="label-div">
        <label className="label-div">
          <textarea
            className="bio"
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="label-div">
        <label className="label-div">
          <span className="label-span">Birthday: </span>
          <input
            className="label-div"
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="label-div">
        <label className="label-div">
          Gender*:
          <div className="label-div">
            <label className="label-div">
              <input
                className="label-div"
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label className="label-div">
              <input
                className="label-div"
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                required
              />
              Female
            </label>
            <label className="label-div">
              <input
                type="radio"
                name="gender"
                value="Non-binary"
                checked={formData.gender === "Non-binary"}
                onChange={handleChange}
                required
              />
              Non-binary
            </label>
          </div>
        </label>
      </div>
      <div className="label-div">
        <label className="label-div">
          Preferred Gender*:
          <div className="label-div">
            <label className="label-div">
              <input
                className="label-div"
                type="radio"
                name="preferredGender"
                value="Male"
                checked={formData.preferredGender === "Male"}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label className="label-div">
              <input
                className="label-div"
                type="radio"
                name="preferredGender"
                value="Female"
                checked={formData.preferredGender === "Female"}
                onChange={handleChange}
                required
              />
              Female
            </label>
            <label className="label-div">
              <input
                type="radio"
                name="preferredGender"
                value="Non-binary"
                checked={formData.preferredGender === "Non-binary"}
                onChange={handleChange}
                required
              />
              Non-binary
            </label>
          </div>
        </label>
      </div>
      <div className="label-div">
        <label className="label-div">
          <span className="label-span">Min Age Preference: </span>
          <input
            className="label-div"
            type="number"
            name="minAge"
            value={formData.minAge}
            onChange={handleChange}
            defaultValue={18}
          />
        </label>
      </div>
      <div className="label-div">
        <label className="label-div">
          <span className="label-span">Max Age Preference: </span>
          <input
            className="label-div"
            type="number"
            name="maxAge"
            value={formData.maxAge}
            onChange={handleChange}
            defaultValue={99}
          />
        </label>
      </div>
      <div className="label-div">
        <label className="label-div">
          Max Distance Preference (km):
          <input
            className="label-div"
            type="number"
            name="maxDistance"
            value={formData.maxDistance}
            onChange={handleChange}
            defaultValue={50}
          />
        </label>
      </div>
      <div className="Hobbies-div">
        <label className="Hobbies">
          Hobbies:
          <div className="Hobbies-div">
            <label className="Hobbies">
              <input
                type="checkbox"
                name="hobbies"
                value="Reading"
                checked={formData.hobbies.includes("Reading")}
                onChange={handleChange}
              />
              Reading
            </label>
            <label className="Hobbies">
              <input
                type="checkbox"
                name="hobbies"
                value="Traveling"
                checked={formData.hobbies.includes("Traveling")}
                onChange={handleChange}
              />
              Traveling
            </label>
            <label className="Hobbies">
              <input
                type="checkbox"
                name="hobbies"
                value="Cooking"
                checked={formData.hobbies.includes("Cooking")}
                onChange={handleChange}
              />
              Cooking
            </label>
          </div>
        </label>
      </div>
      <div className="Languages-div">
        <label className="Languages">
          Languages:
          <div className="Languages-div">
            <label className="Languages">
              <input
                type="checkbox"
                name="languages"
                value="English"
                checked={formData.languages.includes("English")}
                onChange={handleChange}
              />
              English
            </label>
            <label className="Languages">
              <input
                type="checkbox"
                name="languages"
                value="Spanish"
                checked={formData.languages.includes("Spanish")}
                onChange={handleChange}
              />
              Spanish
            </label>
            <label className="Languages">
              <input
                type="checkbox"
                name="languages"
                value="French"
                checked={formData.languages.includes("French")}
                onChange={handleChange}
              />
              French
            </label>
          </div>
        </label>
      </div>
      <div className="submit">
        <button
          type="submit"
          className="Profile-form-button"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
        {fetchError && <div className="error">{fetchError}</div>}
      </div>
    </form>
  );
};
export default CreateProfile;
