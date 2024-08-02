import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import { FormProvider } from "./context/formContext";
import { UsersProvider } from "./context/usersContext";
import { UserProvider } from "./context/userContext";
import "@sendbird/uikit-react/dist/index.css";
import { CustomSendBirdProvider } from "./CustomSendBirdProvider";

/**
 * This component wraps our App with the providers we do not want to have in our tests
 */
//  <SelectBirdProvider>

const AppWrapper = ({ children }) => {
  return (
    <Router>
      <UsersProvider>
        <FormProvider>
          <UserProvider>
            <CustomSendBirdProvider>{children}</CustomSendBirdProvider>
          </UserProvider>
        </FormProvider>
      </UsersProvider>
    </Router>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppWrapper;
