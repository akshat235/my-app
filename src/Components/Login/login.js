import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    try {
      const existingUsersJSON = localStorage.getItem("users");
      const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
      const user = existingUsers.find((user) => user.email === email && user.password === password);  
      if (user) {
        console.log("Login successful. User:", user);
        navigate("/menu");
      } else {
        setErrorMsg("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMsg("An unexpected error occurred. Please try again later.");
    }
  };
  

  useEffect(() => {
    setIsFormValid(!emailError && !passwordError && email && password);
  }, [emailError, passwordError, email, password]);

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError("");
  };

  const validateEmail = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError("");
  };

  return (
    <div id="login-container" className="Login">
              Please provide your credentials!
      <div id="login-form" onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          onBlur={validateEmail}
          required
        />
        <span id="email-error">{emailError}</span>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          required
        />
        <span id="password-error">{passwordError}</span>
        <button type="submit" onClick={handleLogin} disabled={!isFormValid} id="login-button">
          Login
        </button>
        <button onClick={() => navigate("/register")}>Register</button>
        <span id="error-message">{errorMsg}</span>
      </div>
    </div>
  );
  
}

export default Login;
