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
  const [avatarSvg, setAvatarSvg] = useState("");
  const [avatarError, setAvatarError] = useState(false);
  const name =
    user.firstName || names[Math.floor(Math.random() * names.length)];
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
