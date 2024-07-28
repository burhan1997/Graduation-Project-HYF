import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import "../../public/index.css";
import TEST_ID from "./Nav.testid";
import { images } from "../../public/assets/images";
import { UserContext } from "../context/userContext";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  function handleSignOut() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/sign-in");
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
        <Link to="/user" data-testid={TEST_ID.linkToUsers}>
          <li>Users</li>
        </Link>
        {/* {user ? 
        <p>user there is</p>  : <p>no user</p>
        } */}

        {user ? (
          <li
            onClick={handleSignOut}
            style={{ display: user ? "inline" : "none", cursor: "pointer" }}
          >
            Sign out
          </li>
        ) : (
          <>
            <Link
              to="/sign-in"
              data-testid={TEST_ID.linkToSignIn}
              style={{ display: user ? "none" : "inline" }}
            >
              <li>Sign in</li>
            </Link>
            <Link to="/sign-up" style={{ display: user ? "none" : "inline" }}>
              <li>Sign up</li>
            </Link>
          </>
        )}
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
