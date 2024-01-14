import React from "react";
import "./landing.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="Landing">
      <div className="Background"></div>
      <div className="Content">
        <h1>AI Demo App</h1>
        <div className="Buttons">
          <button onClick={handleRegisterClick}>Register</button>
          <button onClick={handleLoginClick}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
