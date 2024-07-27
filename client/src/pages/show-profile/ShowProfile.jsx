import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getToken } from "../../config/getToken";
import { jwtDecode } from "jwt-decode";
import "./ShowProfile.css";

const ShowProfile = () => {
  const [userData, setUserData] = useState(null);
  const token = getToken();
  const userId = token ? jwtDecode(token)._id : null;

  const onReceivedProfile = (data) => {
    setUserData(data.user);
  };

  const {
    isLoading,
    error: fetchProfileError,
    performFetch: performProfileFetch,
    cancelFetch,
  } = useFetch(`/user/${userId}`, onReceivedProfile);

  performProfileFetch({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (!userData) {
    return <div>No profile data available</div>;
  }

  return (
    <div className="Profile-display">
      <h1>Profile</h1>
      <div className="Profile-section">
        <img
          className="Profile-avatar"
          src={
            userData.profile_picture ||
            "https://img.freepik.com/free-vector/find-person-job-opportunity_24877-63457.jpg"
          }
          alt="Avatar"
        />
        <div className="Profile-details">
          <div className="Profile-item">
            <strong>First Name:</strong> {userData.firstName}
          </div>
          <div className="Profile-item">
            <strong>Last Name:</strong> {userData.lastName}
          </div>
          <div className="Profile-item">
            <strong>Email:</strong> {userData.email}
          </div>
          <div className="Profile-item">
            <strong>Birthday:</strong>{" "}
            {new Date(userData.birthday).toLocaleDateString()}
          </div>
          <div className="Profile-item">
            <strong>Gender:</strong> {userData.gender}
          </div>
          <div className="Profile-item">
            <strong>Bio:</strong> {userData.bio}
          </div>
          <div className="Profile-item">
            <strong>Location:</strong> {userData.location}
          </div>
          <div className="Profile-item">
            <strong>Min Age Preference:</strong> {userData.min_age_preference}
          </div>
          <div className="Profile-item">
            <strong>Max Age Preference:</strong> {userData.max_age_preference}
          </div>
          <div className="Profile-item">
            <strong>Preferred Gender:</strong> {userData.preferred_gender}
          </div>
          <div className="Profile-item">
            <strong>Max Distance Preference:</strong>{" "}
            {userData.max_distance_preference} km
          </div>
          <div className="Profile-item">
            <strong>Hobbies:</strong> {userData.hobbies.join(", ")}
          </div>
        </div>
        {fetchProfileError && <div>Error occured..sorry</div>}
      </div>
    </div>
  );
};

export default ShowProfile;
