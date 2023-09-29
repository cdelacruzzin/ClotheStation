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

export const QUERY_CATEGORIES =gql`
query Query {
  allCategories {
    _id
    name
    products {
      price
      name
      description
      _id
     # comment {
        #user{

        #}
        #timestamp
        #text
        #id
      #}
      category{
        _id
        name
        products{
          _id
          name
          price
          description
          imageSource
        }
      }
    }
  }
}`;

export const QUERY_ALL_PRODUCTS = gql`
query AllProducts {
  allProducts {
    _id
    price
    name
    description
  }
}`;