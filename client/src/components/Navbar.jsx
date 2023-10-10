import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
// import Auth from "../utils/auth";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUserPlus, faCartShopping } from "@fortawesome/free-solid-svg-icons";

// import { useStoreContext } from "../utils/globalState";
// import { UPDATE_CURRENT_CATEGORY } from "../utils/actions";
import Login from '../pages/Login';
import SignupForm from '../components/signup/index';
import logo from "../assets/logo.svg";
import AccountModal from "./AccountModal";
import "./css/Navbar.scss";

import AuthService from "../utils/auth"; // Import your AuthService

const Navbar = () => {
  const location = useLocation();

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignUpModalOpen] = useState(false);
  // Use AuthService methods to check authentication status
  const isLoggedIn = AuthService.loggedIn();
  console.log(isLoggedIn)

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

  // open the login modal
  const openLoginModal = () => {
    setLoginModalOpen(true);
  }

  // const closeLoginModal = () => {
  //   setLoginModalOpen(false);
  // }
  // open the singup modal
  const openSignupModal = () => {
    setSignUpModalOpen(true);
  }

  // const closeSignupModal = () => {
  //   setSignUpModalOpen(false);
  // }

  // close both modals
  const handleModalsCLose = () => {
    setLoginModalOpen(false);
    setSignUpModalOpen(false);
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
                <AccountModal />
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


                <Link to="cart">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Link>
              </div>

            </>
          ) : (
            <div className="flex flex-row gap-x-2 mx-2">
              <AccountModal />
              <Link to="cart">
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>
              {/* <Link onClick={openLoginModal}>
                <FontAwesomeIcon icon={faRightToBracket} />
              </Link>
              <Link onClick={openSignupModal}>
                <FontAwesomeIcon icon={faUserPlus} />
              </Link> */}
            </div>
          )}
        </div>

        {/* === NAVBAR TOGGLE BUTTON === unused it seems so I commented it out.*/}
        {/* <button
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
        </button> */}
      </div>
      {/* handle login modal open and close, same for sign up modal */}
      <Login open={loginModalOpen} handleClose={handleModalsCLose} />
      <SignupForm open={signupModalOpen} handleClose={handleModalsCLose} />
    </div>
  );
};
export default Navbar;
