import React from "react";
import TEST_ID from "./Home.testid";
import UserList from "../user-list/UserList";
import Map from "../../components/Map";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <Map />
      <UserList />
    </div>
  );
};

export default Home;
