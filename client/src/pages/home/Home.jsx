import React from "react";

import TEST_ID from "./Home.testid";
import UserList from "../user-list/UserList";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <UserList />;
    </div>
  );
};

export default Home;
