import React, { useContext } from "react";
import TEST_ID from "./Home.testid";
import { FilterForm } from "../../components/filter/FilterForm";
import { UsersContext } from "../../context/usersContext";
import Map from "../../components/Map"; // Adjust the import path based on your project structure

const Home = () => {
  const { setUrl, isLoading, getUsersError, users } = useContext(UsersContext);

  return (
    <div data-testid={TEST_ID.container}>
      <FilterForm setUrl={setUrl} />

      <h1>This is the homepage</h1>
      <p>Good luck with the project!</p>
      <div>
        {isLoading && <p>Loading...</p>}
        {getUsersError && <p>{getUsersError.toString()}</p>}
      </div>
      <div>
        {users?.map((user) => (
          <div key={user._id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>

      <Map />
    </div>
  );
};

export default Home;
