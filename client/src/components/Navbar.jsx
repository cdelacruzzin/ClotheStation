// import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
// import Auth from "../utils/auth";

// import { useStoreContext } from "../utils/globalState";
// import { UPDATE_CURRENT_CATEGORY } from "../utils/actions";

import logo from "../assets/logo.svg";
import "./css/Navbar.scss";

import AuthService from "../utils/auth"; // Import your AuthService

const Navbar = () => {
  const location = useLocation();

  // Use AuthService methods to check authentication status
  const isLoggedIn = AuthService.loggedIn();

  // const [value, setValue] = useState(0); // Start with first tab
  // const [state, dispatch] = useStoreContext();

  // function resetCategory() {
  //   console.log(state);
  //   dispatch({
  //     type: UPDATE_CURRENT_CATEGORY,
  //     currentCategory: { id: "", name: "" },
  //   });
  // }
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or token (implement this in your Auth utility)
    AuthService.logout();

    // Redirect to the login page or another appropriate location
    navigate('/');
  };

  return (
    <div className="Navbar">
      <div id="nav--logo-container">
        <Link to="/" className="flex flex-row items-center gap-x-3">
          <img src={logo} alt="Website Logo" />
          <h1>Urban Sk8</h1>
        </Link>
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

      <div id="nav--icons">
        {/* Conditionally render the Account icon if logged in */}
        <div>
          {/* Conditional rendering */}
          {isLoggedIn ? (
            <>
              {/* === NAVBAR ACCOUNT BUTTON === */}
              <div
                className="nav--icons-account"
                onClick={() => {
                  document
                    .querySelector(".nav--icons-account")
                    .classList.toggle("open");
                }}
              >
                {/* logout and settings button, should be wrapped in this div */}
                {/*logout icon*/}
                <a href="/" onClick={handleLogout}>
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
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                </a>

                {/*cog/settings icon*/}
                <a href="/settings">
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
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </a>
              </div>

            </>
          ) : (
            <div className="flex flex-row gap-x-2 mx-2">
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign-Up</Link>
            </div>
          )}
        </div>

        {/* === NAVBAR TOGGLE BUTTON === unused it seems so I commented it out.
      <button
        id="nav--links-toggle"
        onClick={() => {
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
      </button>*/}
      </div>
    </div>
  );
};
export default Navbar;
