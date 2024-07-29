import React from "react";
import "./UserCard.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import calculateAge from "../../util/calculateAge";
import { images } from "../../../public/assets/images";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const names = [
    "Alex",
    "Casey",
    "Jordan",
    "Taylor",
    "Morgan",
    "Avery",
    "Riley",
    "Cameron",
    "Jamie",
    "Quinn",
    "Dakota",
    "Skyler",
    "Parker",
    "Reese",
    "Payton",
    "Hayden",
    "Bailey",
    "Rowan",
    "Charlie",
    "Emerson",
  ];

  return (
    <div>
      <div className="usercard-content" onClick={(e) => e.stopPropagation()}>
        <p className="usercard-h">
          {user.firstName
            ? user.firstName
            : names[Math.floor(Math.random() * 20)] +
              ", " +
              calculateAge(user.birthdate)}
        </p>
        <p className="usercard-p">{user.bio.slice(0, 30)}</p>
        <img className="usercard-avatar" src={images.LogoGreen} />
        <button
          className="usercard-button-2"
          onClick={() => navigate(`/user/${user._id}`)}
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
    birthdate: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profile_picture: PropTypes.string.isRequired,
    hobbies: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
