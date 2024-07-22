import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/Sign_up/Sign_up";
import TermsAndConditions from "./pages/TermsAndConditions";
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
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
    </>
  );
};

export default App;
