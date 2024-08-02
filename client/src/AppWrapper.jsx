import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import { FormProvider } from "./context/formContext";
import { UsersProvider } from "./context/usersContext";
import { UserProvider } from "./context/userContext";
import { SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";

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
            <SendBirdProvider
              appId={process.env.REACT_APP_SENDBIRD_APP_ID}
              userId={"new_user_id_123"}
              nickname={"123"}
              theme="dark"
              //             onUserLeaveChannel={() => console.log('User left the channel')}
              // onSendUserMessage={(message) => console.log('Sent message:', message)}
            >
              {children}
            </SendBirdProvider>
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
