import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { getToken } from "../config/getToken";
import { jwtDecode } from "jwt-decode";
import "./ShowProfile.css";

// const profileData = {
//   firstName: 'John',
//   lastName: 'Doe',
//   birthday: '1990-01-01',
//   gender: 'Male',
//   bio: 'A short bio about John Doe.',
//   hobbies: ['Reading', 'Traveling', 'Gaming'],
//   languages: ['English', 'Spanish'],
//   minAge: 25,
//   maxAge: 35,
//   maxDistance: 100,
// };

const ShowProfile = () => {
  // const [profileData, setProfileData] = useState();

  // useEffect(() => {

  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const userData = JSON.parse(localStorage.getItem('profileData')) || {
  //       firstName: '',
  //       lastName: '',
  //       birthday: '',
  //       gender: '',
  //       bio: '',
  //       hobbies: [],
  //       languages: [],
  //       minAge: 18,
  //       maxAge: 99,
  //       maxDistance: 50,
  //     };
  //     setProfileData(userData);
  //   }
  // }, []);
  const token = getToken();
  const userId = token ? jwtDecode(token).user._id : null;
  let profileData;
  const onReceivedProfile = (data) => {
    profileData = data;
  };
  const {
    isLoading,
    error: fetchProfileError,
    performFetch: performProfileFetch,
    cancelFetch,
  } = useFetch(`/user/${userId}`, onReceivedProfile);
  useEffect(() => {
    return () => cancelFetch();
  }, [cancelFetch]);

  if (!userId) {
    return;
  }
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

  return (
    <div className="Profile-display">
      <h1>Profile</h1>
      <div className="Profile-section">
        <img
          className="Profile-avatar"
          src="https://img.freepik.com/free-vector/find-person-job-opportunity_24877-63457.jpg"
          alt="Avatar"
        />
        <div className="Profile-details">
          <div className="Profile-field">
            <strong>First Name:</strong> {profileData.firstName}
          </div>
          <div className="Profile-field">
            <strong>Last Name:</strong> {profileData.lastName}
          </div>
          <div className="Profile-field">
            <strong>Birthday:</strong> {profileData.birthday}
          </div>
          <div className="Profile-field">
            <strong>Gender:</strong> {profileData.gender}
          </div>
          <div className="Profile-field">
            <strong>Bio:</strong> {profileData.bio}
          </div>
          <div className="Profile-field">
            <strong>Hobbies:</strong> {profileData.hobbies.join(", ")}
          </div>
          <div className="Profile-field">
            <strong>Languages:</strong> {profileData.languages.join(", ")}
          </div>
          <div className="Profile-field">
            <strong>Min Age Preference:</strong> {profileData.minAge}
          </div>
          <div className="Profile-field">
            <strong>Max Age Preference:</strong> {profileData.maxAge}
          </div>
          <div className="Profile-field">
            <strong>Max Distance Preference (km):</strong>{" "}
            {profileData.maxDistance}
          </div>
        </div>
      </div>
      {fetchProfileError && (
        <div className="error">{fetchProfileError.toString()}</div>
      )}
    </div>
  );
};

export default ShowProfile;
