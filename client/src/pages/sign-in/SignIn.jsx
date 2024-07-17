import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import useFetch from "../../hooks/useFetch";
import Input from "../../components/Input";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onReceived = (data) => {
    localStorage.setItem("token", data.token);
    navigate("/profile");
  };

  const {
    isLoading,
    error: fetchError,
    performFetch,
    cancelFetch,
  } = useFetch("/signin", onReceived);

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
    //This is a fancy way of checking if email is in string@string.string form, we don't necessarily have to understand it in order to use it as long as it does the job, just like all the npm packages we use yet know not how they work.
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
    //Similarly, this checks if the password is minimum 8 characters, and includes uppercase, lowercase, number, and special character.
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!validateEmail(email) || !validatePassword(password)) {
      setError("Invalid email or password.");
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
    <div className="container">
      <div className="sign-in-form">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
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
          {error && <div className="error">{error}</div>}
          {fetchError && <div className="error">{fetchError}</div>}
          {isLoading && <div className="loading">Loading...</div>}
          <button type="submit" disabled={isLoading}>
            Sign In
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
