import { LOGO_URL } from "../utils/constants";

const Header = () => {
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
        </ul>
      </div>
    </div>
  );
};

export default Header;
