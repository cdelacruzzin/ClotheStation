import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
// import necessary mui modal components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Auth from "../../utils/auth";

const SignupForm = ({ open, handleClose }) => {
  //set the initial form data state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  /**Invokes the useMutation hook from apollo client.
   * "addUser" is a function to trigger the ADD_USER mutation from graphql
   * the {error, data} is the response we get from calling "addUser".
   * */
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target; //destructs the e.target to extract only the name and value.

    //calls the function to modify the userFormData state
    setUserFormData({
      ...userFormData, //creates a shallow copy of the current userFormData state(creates a new object with the same properties & values as the userFormData state)
      [name]: value, //changes the property of the shallow copy(username/email/password) with the value of the target
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      /** calls the "addUser" function to trigger the mutation.
       * passes in a shallow copy of the userFormData as its variables.
       * {data} destructs the response to only extract the "data" property.
       * the "data" property of the response object are the fields that ADD_USER returns. in this case, it returns
       * 1. token
       * 2. user{ _id, username}*/
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      //  once user signed up add token and login
      Auth.login(data.addUser.token);
      // close modal
      handleClose();
      //calls the login function from Auth, which takes in a token id as parameters.
      // Auth.login(data.addUser.token)  //passes in the token from the return response of "addUser"
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // open and close for the sign up
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Signup</DialogTitle>
      <DialogContent>
        {/* form content for the signup modal */}
        <div className="container my-1">
        <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
        <label htmlFor="email">Username: </label>
          <input
            value={userFormData.username}
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Enter a username"
          />
          </div>
          <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address: </label>
          <input
            placeholder="Enter an email"
            type="email"
            name="email"
            onChange={handleChange}
            value={userFormData.email}
          />
          </div>
          <div className="flex-row space-between my-2">
          <label htmlFor="email">Password: </label>
          <input
            placeholder="*********"
            type="password"
            name="password"
            onChange={handleChange}
            value={userFormData.password}
          />
          </div>
         
         {/* error handling */}
        {error && (
          <div>
            <p className="error-text">Error: {error.message}</p>
          </div>
        )}
        {/* handle sign up and cancel for the sign up */}
          <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>

      </form>
        </div>
      </DialogContent>
    
    </Dialog>
  );
};
export default SignupForm;
