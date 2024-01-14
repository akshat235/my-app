// Header.js

import React from "react";
import { Link } from "react-router-dom";
import "./header.css"; // Import the CSS file

function Header() {
  return (
    <header>
      <div className="Headerleft">
        <h1>Demo AI App</h1>
      </div>
      <div className="Headerright">
        <button onClick={() => console.log("Login clicked")}>Login</button>
        <button onClick={() => console.log("Signup clicked")}>Signup</button>
      </div>
    </header>
  );
}

export default Header;
