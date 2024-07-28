import React from "react";
import "./UserCard.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="usercard-content" onClick={(e) => e.stopPropagation()}>
        <p className="usercard-h">{user.firstName + " " + user.lastName}</p>
        <p className="usercard-p">{user.bio}</p>
        <p className="usercard-p">{user.email}</p>
        <p className="usercard-p">{user.hobbies}</p>
        <img className="usercard-avatar" src={user.profile_picture} />
        <button
          className="usercard-button-2"
          //TODO add id to /user/profile${id}
          onClick={() => navigate("/user/profile")}
        >
          View full profile
        </button>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    bio: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    profile_picture: PropTypes.string.isRequired,
    hobbies: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
