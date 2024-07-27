import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/home/Home";
import CreateUser from "./pages/user/CreateUser";
import UserList from "./pages/user/UserList";
import SignIn from "./pages/sign-in/SignIn";
import CreateProfile from "./components/CreateProfile";
import AboutUs from "./pages/AboutUs/AboutUs";
import SignUp from "./pages/sign-up/SignUp";
import UserCard from "./components/user-card/UserCard";
import ShowProfile from "./pages/show-profile/ShowProfile";
import "./index.css";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/usercard" element={<UserCard />} />
        <Route path="/profile" element={<ShowProfile />} />
      </Routes>
    </>
  );
};

export default App;
