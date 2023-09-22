import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
// add mutation for login, accepting email and password
  mutation login($email: String!, $password: String) {
    login(email: $email, password: $password) {
        // access token and logged in user
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
// add mutation to add user with new username, email, password
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        // add token and new user
      token
      user {
        _id
        username
      }
    }
  }
`;
