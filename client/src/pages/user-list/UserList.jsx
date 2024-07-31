import React, { useState, useContext } from "react";
import UserCard from "../../components/user-card/UserCard";
import "./UserList.css";
import { UsersContext } from "../../context/usersContext";

function UserList() {
  const [page, setPage] = useState(0);
  const { isLoading, getUsersError, users } = useContext(UsersContext);
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
      <div className="user-list-container">
        <div className="user-slideshow">
          <div>
            {isLoading && <p>Loading...</p>}
            {getUsersError && <p>{getUsersError.toString()}</p>}
          </div>
          <button className="arrow left-arrow" onClick={handlePrevPage}>
            &#x3c; {/*  &#x2190; */}
          </button>
          {users?.slice(page, page + 7).map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
          <button className="arrow right-arrow" onClick={handleNextPage}>
            &#x3e;{/* &#x2192; */}
          </button>
        </div>
      </div>
    </>
  );
}

export default UserList;
