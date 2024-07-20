import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign_up.css";
import useFetch from "../../hooks/useFetch";
import Input from "../../components/Input";
import "../../../public/index.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onReceived = (data) => {
    localStorage.setItem("token", data.token);
    navigate("/create_profile");
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

  const handleInputChange = (target) => {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

    const { email, password, confirmPassword } = formData;

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

    setError("");

    performFetch({
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container poppins-light">
      <div className="sign-in-up-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
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
          {error && <div className="error">{error}</div>}
          {fetchError && <div className="error">{fetchError}</div>}
          {isLoading && <div className="loading">Loading...</div>}
          <button
            type="submit"
            className="form-button poppins-regular"
            disabled={isLoading}
          >
            Sign Up
          </button>
          <div className="signin-link">
            <p>Already have an account?</p>
            <button
              className="form-button poppins-regular"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
