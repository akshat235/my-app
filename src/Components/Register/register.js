import React from "react";
import "./register.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
 
  const handleRegistration = async (e) => {
    e.preventDefault();
  
    const existingUsersJSON = localStorage.getItem("users");
    const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
    const userExists = existingUsers.some((user) => user.email === email);
  
    if (userExists) {
      setErrorMsg("User with this email already exists. Please login instead.");
    } else {
      existingUsers.push({
        firstName,
        lastName,
        email,
        password,
      });
  
      localStorage.setItem("users", JSON.stringify(existingUsers));
      console.log(existingUsers);  
      navigate("/menu");
    }
  };



  useEffect(() => {
    setIsFormValid(
      !emailError &&
        !passwordError &&
        !confirmPasswordError &&
        firstName &&
        lastName &&
        email &&
        confirmPassword &&
        password
    );
  }, [
    emailError,
    passwordError,
    confirmPasswordError,
    firstName,
    lastName,
    email,
  ]);

  const handleLoginEmailChange = (value) => {
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
    if (!value) {
      setPasswordError("");
    } else {
      if (
        value.length < 8 ||
        !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value) ||
        !/[a-z]/.test(value) ||
        !/[A-Z]/.test(value) ||
        !/\d/.test(value)
      ) {
        setPasswordError(
          "Password should be at least 8 characters long and include 1 uppercase, 1 lowercase, 1 number, and 1 special character."
        );
      } else {
        setPasswordError("");
      }
    }
    setPassword(value);
    setIsFormValid(!passwordError && !confirmPasswordError);
  };

  const handleConfirmPasswordChange = (value) => {
    if (!value) {
      setConfirmPasswordError("");
    } else {
      if (value != password) {
        setConfirmPasswordError("Confirm Password should be same as Password.");
      } else {
        setConfirmPasswordError("");
      }
    }
    setConfirmPassword(value);
    setIsFormValid(!passwordError && !confirmPasswordError);
  };

  return (
    <>
    <div className="Container">
    <div> Please provide your information and SignUp!
    <div className="Registrationform">

      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => handleLoginEmailChange(e.target.value)}
        onBlur={validateEmail}
        required
      />
      <span>{emailError}</span>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}

        required
      />
      <span>{passwordError}</span>
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => handleConfirmPasswordChange(e.target.value)}

        required
      />
      <span>{confirmPasswordError}</span>
      <button
        type="submit"
        onClick={handleRegistration}
        disabled={!isFormValid}
      >
        Sign Up
      </button>
      <button onClick={() => navigate("/login")}>Login</button>

      <span>{errorMsg}</span>
    </div>
    </div></div>
   
    </>
  );
}

export default Register;
