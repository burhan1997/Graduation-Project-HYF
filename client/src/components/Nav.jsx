import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import "../../public/index.css";
import TEST_ID from "./Nav.testid";
import { FormContext } from "../context/formContext";
import { images } from "../../public/assets/images";
import { useUser } from "../hooks/useUser";

const Nav = () => {
  const { isSignIn, setIsSignIn } = useContext(FormContext);
  const {user} = useUser();
  console.log(user)
  const navigate = useNavigate();
  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("isSignIn");
    setIsSignIn(false);
    navigate("/");
  }
  return (
    <div className="nav">
      <img src={images.LogoPurple} alt="Logo" className="logo" />
      <ul className="ul-text poppins-bold">
        <Link to="/" data-testid={TEST_ID.linkToHome}>
          <li>Home</li>
        </Link>
        <Link to="/about-us">
          <li>About Us</li>
        </Link>
        <Link
          to="/sign-in"
          data-testid={TEST_ID.linkToSignIn}
          style={{ display: isSignIn ? "none" : "inline" }}
        >
          <li>Sign in</li>
        </Link>
        <Link to="/sign-up" style={{ display: isSignIn ? "none" : "inline" }}>
          <li>Sign up</li>
        </Link>

        <li
          onClick={handleSignOut}
          style={{ display: isSignIn ? "inline" : "none", cursor: "ponter" }}
        >
          Sign out
        </li>
          <li>
            <img src={user?.profile_picture} className="li-img" alt="My Profile" />{" "}
          </li>
          <button  className="nav-button" onClick={()=> navigate("/create-profile")}>My Profile </button>
      </ul>
      <ul className="ul-img">
        <Link to="/home">
          <li>
            <img src={images.Globe} className="li-img" alt="Map" />{" "}
          </li>
        </Link>
        <Link to="/inbox">
          <li>
            <img src={images.Mail} className="li-img" alt="Messages" />{" "}
          </li>
        </Link>
        <Link to="/settings">
          <li>
            <img src={images.Settings} className="li-img" alt="Settings" />{" "}
          </li>
        </Link>
        <Link to="/profile">
          <li>
            <img src={images.AccountCircle} className="li-img" alt="Profile" />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
