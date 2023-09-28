import { gql } from "@apollo/client";

export const QUERY_ME = gql`
# add query for current logged-in user
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }`