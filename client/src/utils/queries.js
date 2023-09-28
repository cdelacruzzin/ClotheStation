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


export const QUERY_CATEGORIES =gql`
query Query {
  allCategories {
    id
    name
    products {
      price
      name
      description
      _id
      comment {
        username
        timestamp
        text
        id
      }
      category
    }
  }
}`