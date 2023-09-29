import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Auth from "../utils/auth";
// import { Link as RouterLink } from "react-router-dom";

// import { Box } from "@mui/system";
// import { Tabs, Tab, Link as MuiLink } from "@mui/material";
import { useStoreContext } from "../utils/globalState";
import { UPDATE_CURRENT_CATEGORY } from "../utils/actions";

import logo from "../assets/logo.svg";

import "./css/Navbar.scss";

const Navbar = () => {
  const location = useLocation();
  
  const [value, setValue] = useState(0); // Start with first tab
  const [state, dispatch] = useStoreContext();

  function resetCategory() {
    console.log(state);
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: { id: "", name: "" },
    });
  }
  return (
    <div className="Navbar">
      <div id="nav--logo-container">
        <img src={logo} alt="Website Logo" />
        <h1>Urban Sk8</h1>
      </div>
      <nav id="nav--links-container">
        <Link to="/" className={location.pathname === "/" ? "selected" : ""}>
          Home
        </Link>
        <Link
          to="/products"
          className={location.pathname === "/products" ? "selected" : ""}
        >
          Shop
        </Link>
        <Link
          to="/categories"
          className={location.pathname === "/categories" ? "selected" : ""}
        >
          Categories
        </Link>
      </nav>
      <div id={"nav--icon-container"}>
        <button
          id={"nav--account-link"}
          onClick={() => {
            document
              .querySelector(`.account-dropdown`)
              .classList.toggle("open");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </button>
        <div className="account-dropdown">
          <Link>Profile</Link>
          <button onClick={Auth.logout}>Logout</button>
        </div>

        <button
          id="nav--links-toggle"
          onClick={() => {
            console.log(
              document.getElementById("nav--links-container")
            );
            document
              .getElementById("nav--links-container")
              .classList.toggle("opened");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
