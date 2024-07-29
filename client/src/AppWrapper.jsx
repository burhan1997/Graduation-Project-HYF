import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import { FormProvider } from "./context/formContext";
import { UsersProvider } from "./context/usersContext";

/**
 * This component wraps our App with the providers we do not want to have in our tests
 */
const AppWrapper = ({ children }) => {
  return (
    <Router>
      <UsersProvider>
        <FormProvider>{children}</FormProvider>
      </UsersProvider>
    </Router>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppWrapper;
