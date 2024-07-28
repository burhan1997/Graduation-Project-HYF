import React, { useState, useContext } from "react";
import UserCard from "../../components/user-card/UserCard";
import "./UserList.css";
import { images } from "../../../public/assets/images";
import { FilterForm } from "../../components/filter/FilterForm";
import { UsersContext } from "../../context/usersContext";

function UserList() {
  const [page, setPage] = useState(0);
  const { setUrl, isLoading, getUsersError, users } = useContext(UsersContext);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 7, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 7, Math.floor(users.length / 7) * 7),
    );
  };

  return (
    <>
      <FilterForm setUrl={setUrl} />
      <div className="user-list-container">
        <img className="map" src={images.MapView} alt="Map View" />
        <div className="user-slideshow">
          <div>
            {isLoading && <p>Loading...</p>}
            {getUsersError && <p>{getUsersError.toString()}</p>}
          </div>
          <button className="arrow left-arrow" onClick={handlePrevPage}>
            &#x2190;
          </button>
          {users?.slice(page, page + 7).map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
          <button className="arrow right-arrow" onClick={handleNextPage}>
            &#x2192;
          </button>
        </div>
      </div>
    </>
  );
}

export default UserList;
