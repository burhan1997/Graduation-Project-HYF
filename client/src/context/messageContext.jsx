// MessageContext.js
import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [newMessageCount, setNewMessageCount] = useState(0);
  return (
    <MessageContext.Provider value={{ newMessageCount, setNewMessageCount }}>
      {children}
    </MessageContext.Provider>
  );
};
MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
