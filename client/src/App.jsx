import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/home/Home";
import { UpdateProfileForm } from "./components/forms/UpdateProfileForm";
import CreateUser from "./pages/user/CreateUser";
import UserList from "./pages/user/UserList";
import SignIn from "./pages/sign-in/SignIn";
import AboutUs from "./pages/AboutUs/AboutUs";
import SignUp from "./pages/sign-up/SignUp";
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
        <Route path="/create-profile" element={<UpdateProfileForm />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
