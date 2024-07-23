import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign_up.css";
import useFetch from "../../hooks/useFetch";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import "../../../public/index.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onReceived = (data) => {
    localStorage.setItem("token", data.token);
    navigate("/create-profile");
  };

  const {
    isLoading,
    error: fetchError,
    performFetch,
    cancelFetch,
  } = useFetch("/user/sign-up", onReceived);

  useEffect(() => {
    return () => cancelFetch();
  }, [cancelFetch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (target) => {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const validateName = (i) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(i) && i.length > 2 && i.length < 50;
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword, terms } =
      formData;

    if (!validateName(firstName)) {
      setError(
        "First name has to be at least 2 characters long and contain only letters.",
      );
      return;
    }
    if (!validateName(lastName)) {
      setError(
        "Last name has to be at least 2 characters long and contain only letters.",
      );
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password has to be at least 8 characters long and must include uppercase, lowercase, numbers, and special characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!terms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    setError("");

    const body = {
      user: {
        firstName,
        lastName,
        email,
        password,
      },
    };
    performFetch({
      method: "POST",
      body: JSON.stringify(body),
    });
    performFetch({
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container poppins-light">
      <div className="sign-in-up-form">
        <div className="form-container">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="">First name:</label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Last name:</label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-container">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className={`eye-icon ${showPassword ? "show" : ""}`}
                  onClick={togglePasswordVisibility}
                >
                  👁
                </span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-container">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className={`eye-icon ${showPassword ? "show" : ""}`}
                  onClick={togglePasswordVisibility}
                >
                  👁
                </span>
              </div>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleCheckboxChange}
                required
              />
              <label htmlFor="terms">
                I agree to the{" "}
                <a href="#terms-and-conditions" onClick={openModal}>
                  Terms and Conditions
                </a>
              </label>
            </div>

            {error && <div className="error">{error}</div>}
            {fetchError && <div className="error">{fetchError.toString()}</div>}
            {isLoading && <div className="loading">Loading...</div>}
            <button
              type="submit"
              className="form-button sign-up-button poppins-regular"
              disabled={isLoading}
            >
              Sign Up
            </button>
            <div className="sign-in-up-link">
              <p className="sign-in-up-text">Already have an account? </p>
              <span
                className="sign-in-text"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </span>
            </div>
          </form>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default SignUp;
