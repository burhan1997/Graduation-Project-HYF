import React from "react";
import "./UserCard.css";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="usercard-content" onClick={(e) => e.stopPropagation()}>
        <p className="usercard-h">{user.name + ", " + user.age}</p>
        <p className="usercard-p">{user.status}</p>
        <img className="usercard-avatar" src={user.avatar} />
        <button
          className="usercard-button-2"
          onClick={() => navigate("/user/profile")}
        >
          View full profile
        </button>
      </div>
    </div>
  );
};

export default UserCard;
