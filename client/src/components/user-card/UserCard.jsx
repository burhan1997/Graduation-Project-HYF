import React from "react";
import "./UserCard.css";
import { useNavigate } from "react-router-dom";

const UserCard = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="usercard-content" onClick={(e) => e.stopPropagation()}>
        <p className="usercard-h">Maria, 22</p>
        <p className="usercard-p">Who is up for rollerblading?</p>
        <img
          className="usercard-avatar"
          src="/E0B013B3-F191-4CAA-8258-C20AFD106E21.png"
        />
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
