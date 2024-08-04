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
import { ShowProfile } from "./components/ShowProfile";
import { Chat } from "./pages/chat/Chat";

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
        <Route path="/profile" element={<ShowProfile />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/user/profile" element={<h1>Profile</h1>} />
        <Route path="/user/:id" element={<ShowProfile />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;
