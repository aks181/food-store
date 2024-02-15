import { useState } from "react";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  let [btnName, setBtnName] = useState("Login");

  return (
    <div className="header">
      <div className="logo-container">
        <img src={LOGO_URL} alt="app-logo" className="logo" />
      </div>
      <div className="nav-container">
        <ul className="nav-links">
          <li className="nav-link">Home</li>
          <li className="nav-link">About Us</li>
          <li className="nav-link">Contact</li>
          <li className="nav-link">Cart</li>
          <li
            className="nav-link"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
