import React, { useState, useEffect } from "react";
import "./UserCard.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import calculateAge from "../../util/calculateAge";
import { images } from "../../../public/assets/images";
import { names, activityStatuses } from "./fillingData";
import multiavatar from "@multiavatar/multiavatar/esm";

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
  const activityStatuses = [
    "Who wants to grab a pizza?",
    "Anyone up for rollerblading?",
    "Looking for a hiking buddy!",
    "Let's go for a coffee!",
    "Who's in for a movie night?",
    "Game night, anyone?",
    "Time for some beach volleyball!",
    "Who wants to go cycling?",
    "Up for a run in the park?",
    "Picnic in the park?",
    "Let's go bowling!",
    "Anyone for a tennis match?",
    "Who's free for a BBQ?",
    "Ready for a road trip!",
    "Who wants to go fishing?",
    "Up for some rock climbing?",
    "How about a dance party?",
    "Let's hit the gym together!",
    "Looking for a shopping buddy!",
    "Who's in for a karaoke night?",
  ];
  const name = user.firstName
    ? user.firstName
    : names[Math.floor(Math.random() * 20)];
  const age = user.birthday
    ? calculateAge(user.birthday)
    : Math.floor(Math.random() * 80 + 18);

  useEffect(() => {
    try {
      const svg = multiavatar(name);
      setAvatarSvg(svg);
    } catch (error) {
      setAvatarError(true);
    }
  }, [name]);

  const handleViewProfileClick = () => {
    navigate(`/user/${user._id}`);
  };

  return (
    <div>
      <div className="usercard-content" onClick={(e) => e.stopPropagation()}>
        <p className="usercard-h">{`${name}, ${age}`}</p>
        <p className="usercard-p">
          {user.bio
            ? user.bio.slice(0, 30)
            : activityStatuses[
                Math.floor(Math.random() * activityStatuses.length)
              ]}
        </p>

        <div className="usercard-avatar">
          {avatarError ? (
            <img
              src={images.LogoGreen}
              alt="Fallback Avatar"
              className="fallback-avatar"
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: avatarSvg }}
              className="avatar-svg"
            />
          )}
        </div>
        <button className="usercard-button-2" onClick={handleViewProfileClick}>
          View full profile
        </button>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCard;
