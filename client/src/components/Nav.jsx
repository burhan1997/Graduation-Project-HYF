import React from "react";
import { Link } from "react-router-dom";

import TEST_ID from "./Nav.testid";

const Nav = () => {
  return (
    <ul>
      <Link to="/" data-testid={TEST_ID.linkToHome}>
        <li>Home</li>
      </Link>
      <Link to="/user" data-testid={TEST_ID.linkToUsers}>
        <li>Users</li>
      </Link>
      <Link to="/sign-in" data-testid={TEST_ID.linkToSignIn}>
        <li>Log in</li>
      </Link>
      <Link to="/sign-up">
        <li>Sign up</li>
      </Link>
    </ul>
  );
};

export default Nav;
