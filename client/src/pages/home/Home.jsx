import React, { useEffect, useState } from "react";

import TEST_ID from "./Home.testid";
import { FilterForm } from "../../components/filter/FilterForm";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const [url, setUrl] = useState("/user");
  const [filteredUser, setFilteredUser] = useState();

  const onReceived = (data) => {
    setFilteredUser(data.users);
  };

  useEffect(() => {
    return () => cancelFetch();
  }, [cancelFetch]);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    url,
    onReceived,
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [url]);

  return (
    <div data-testid={TEST_ID.container}>
      <FilterForm
        onReceived={onReceived}
        setUrl={setUrl}
        performFetch={performFetch}
      />

      <h1>This is the homepage</h1>
      <p>Good luck with the project!</p>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error.toString()}</p>}
      </div>
      <div>
        {filteredUser?.map((user) => (
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
