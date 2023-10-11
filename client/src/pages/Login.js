import React, { useState } from "react";
import { useMutation } from "@apollo/client";
// import { Link } from "react-router-dom";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
// import necessary modal components from the mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

// import signup
import SignupForm from '../components/signup/index';

// use open and handleClose as props for the login modal
function Login({ open, handleClose }) {
  // set signupModal state as false
  const [signupModalOpen, setSignUpModalOpen] = useState(false);
  // once open signup modal, set state to true
  const openSignupModal = () => {
    setSignUpModalOpen(true);
  }

  // close signup modal
  const closeSignupModal = () => {
    setSignUpModalOpen(false);
  }

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });

      console.log(mutationResponse)
      const token = mutationResponse.data.login.token;
      Auth.login(token);

      //should redirect to homepage
      // window.location.href = '/'; // Replace with your home page URL
      // handleClose login modal once logged in
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    // modal open and close
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        {/* content for login modal */}
        <div className="container my-1">
          {/* opens the signup modal */}
          <Button onClick={openSignupModal}>← Go to Signup</Button>

          <h2>Login</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2">
              <label htmlFor="email">Email address: </label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="pwd">Password: </label>
              <input
                placeholder="*********"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
            {error && (
              <div>
                <p className="error-text">
                  The provided credentials are incorrect
                </p>
              </div>
            )}

            <DialogActions>
              {/* close modal or sign in */}
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleFormSubmit}>
                Sign In
              </Button>
            </DialogActions>
          </form>
        </div>
      </DialogContent>
      {/* sign up form handling */}
      <SignupForm open={signupModalOpen} handleClose={closeSignupModal} />
    </Dialog>
  );
}

export default Login;
