import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  let [btnName, setBtnName] = useState("Login");
  const user = useContext(UserContext);
  // console.log(user);

  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);

  return (
    <div className="header flex justify-between items-center px-6 py-4 rounded-b-lg rounded-br-lg  border-2 border-gray-200 border-t-0 shadow-lg shadow-gray-400">
      <div className="logo-container overflow-hidden">
        <img
          src={LOGO_URL}
          alt="app-logo"
          className="logo w-16 h-16 scale-150 origin-center"
        />
      </div>
      <div className="nav-container">
        <ul className="nav-links flex  items-center ">
          <li className="nav-link list-none text-base px-3 py-8  ">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-link list-none text-base px-3 py-8">
            <Link to="/about">About Us</Link>
          </li>
          <li className="nav-link list-none text-base px-3 py-8">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="nav-link list-none text-base px-3 py-8">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="nav-link list-none text-base px-3 py-8">
            <Link to="/cart">Cart - ({cartItems.length} items)</Link>
          </li>
          <li
            className="nav-link list-none text-base bg-slate-200 rounded-3xl py-2 px-6 cursor-pointer select-none hover:bg-slate-400 hover:text-slate-50"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </li>
          <li className="nav-link list-none text-base px-3 py-8">
            {user.loggedInUser}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
