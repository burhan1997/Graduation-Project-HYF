import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/home/Home";
import CreateUser from "./pages/user/CreateUser";
import UserList from "./pages/user/UserList";
import SignIn from "./pages/sign-in/SignIn";
import CreateProfile from "./components/CreateProfile";
import SignUp from "./pages/sign_up/Sign_up";
import "./index.css";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/nav" element={<Nav />} />
      </Routes>
    </>
  );
};

export default App;
