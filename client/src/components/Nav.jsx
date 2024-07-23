import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import "../../public/index.css";
import TEST_ID from "./Nav.testid";

const Nav = () => {
  return (
    <div className="nav">
      <img
        src="/E0B013B3-F191-4CAA-8258-C20AFD106E21.png"
        alt="Logo"
        className="logo"
      />
      <ul className="ul-text poppins-bold">
        <Link to="/" data-testid={TEST_ID.linkToHome}>
          <li>Home</li>
        </Link>
        <Link to="/user" data-testid={TEST_ID.linkToUsers}>
          <li>Users</li>
        </Link>
        <Link to="/sign-in" data-testid={TEST_ID.linkToSignIn}>
          <li>Sign in</li>
        </Link>
        <Link to="/sign-up">
          <li>Sign up</li>
        </Link>
      </ul>
      <ul className="ul-img">
        <Link to="/home">
          <li>
            <img src="/Globe.png" className="li-img" alt="Map" />{" "}
          </li>
        </Link>
        <Link to="/inbox">
          <li>
            <img src="/mail.png" className="li-img" alt="Messages" />{" "}
          </li>
        </Link>
        <Link to="/settings">
          <li>
            <img src="/settings.png" className="li-img" alt="Settings" />{" "}
          </li>
        </Link>
        <Link to="/profile">
          <li>
            <img src="/account_circle.png" className="li-img" alt="Profile" />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
