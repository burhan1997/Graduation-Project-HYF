import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import SignIn from "./pages/Sign-in/SignIn";
import { UpdateProfileForm } from "./components/forms/UpdateProfileForm";
import SignUp from "./pages/Sign_up/Sign_up";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create-profile" element={<UpdateProfileForm />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/nav" element={<Nav />} />
      </Routes>
    </>
  );
};

export default App;
