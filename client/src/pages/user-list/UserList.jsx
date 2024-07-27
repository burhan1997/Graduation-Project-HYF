import React, { useState } from "react";
import UserCard from "../../components/user-card/UserCard";
import "./UserList.css";
import { mockData } from "./mockData";
import { images } from "../../../public/assets/images";
import { jwtDecode } from "jwt-decode";

function UserList() {
  const [page, setPage] = useState(0);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 7, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 7, Math.floor(mockData.length / 7) * 7),
    );
  };

  const token = localStorage.getItem("token");

  if (token) {
    const id = jwtDecode(token)._id;

    fetch(`http://localhost:3000/api/user/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        return res.json();
      })
      .then((user) => {
        const userData = user;
        console.log(userData);
      })
      .catch((err) =>
        console.error("There was a problem with the fetch operation:", err),
      );
  } else {
    console.error("No token found in localStorage");
  }

  return (
    <div className="user-list-container">
      <img className="map" src={images.MapView} alt="Map View" />
      <div className="user-slideshow">
        <button className="arrow left-arrow" onClick={handlePrevPage}>
          &#x2190;
        </button>
        {mockData.slice(page, page + 7).map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
        <button className="arrow right-arrow" onClick={handleNextPage}>
          &#x2192;
        </button>
      </div>
    </div>
  );
}

export default UserList;
