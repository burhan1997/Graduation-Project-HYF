import React, { useContext } from "react";

import TEST_ID from "./Home.testid";
import UserList from "../user-list/UserList";
import { FilterForm } from "../../components/filter/FilterForm";
import { UsersContext } from "../../context/usersContext";

const Home = () => {
  const { setUrl, isLoading, getUsersError, users } = useContext(UsersContext);

  return (
    <div data-testid={TEST_ID.container}>
      <FilterForm setUrl={setUrl} />
      <UserList />;
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
    </div>
  );
};

export default Home;
