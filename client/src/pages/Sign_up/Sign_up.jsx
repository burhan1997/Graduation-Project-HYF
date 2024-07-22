import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign_up.css";
import useFetch from "../../hooks/useFetch";
import Input from "../../components/Input";
import "../../../public/index.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  } = useFetch("/user/create", onReceived);

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

    const { firstName, lastName, email, password, confirmPassword } = formData;

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
    if (!termsAccepted) {
      setError("You must accept the Terms and Conditions to sign up.");
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
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };
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
            <div className="terms">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={termsAccepted}
                onChange={handleTermsChange}
              />
              <label htmlFor="terms">
                I accept the <a href="/terms">Terms and Conditions</a>
              </label>
            </div>
            {error && <div className="error">{error}</div>}
            {fetchError && <div className="error">{fetchError.toString()}</div>}
            {isLoading && <div className="loading">Loading...</div>}
            <button
              type="submit"
              className="form-button sign-up-button poppins-regular"
              disabled={isLoading || !termsAccepted}
            >
              Sign Up
            </button>
            <div className="sign-in-up-link">
              <p className="sign-in-up-text">Already have an account?</p>
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
    </div>
  );
};

export default SignUp;
