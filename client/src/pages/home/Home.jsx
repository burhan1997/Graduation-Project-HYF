import React, { useContext } from "react";
import TEST_ID from "./Home.testid";
import UserList from "../user-list/UserList";
import Map from "../../components/Map";
import { FormContext } from "../../context/formContext";
import AboutUs from "../AboutUs/AboutUs";

const Home = () => {
  const { isSignIn } = useContext(FormContext);
  return (
    <div data-testid={TEST_ID.container}>
      {isSignIn ? (
        <div>
          <Map />
          <UserList />
        </div>
      ) : (
        <AboutUs />
      )}
    </div>
  );
};

export default Home;
