const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # user that takes id, username, email, password and products in an array
  type User {
    _id: ID
    username: String
    email: String
    password: String
    products: [Product]!
  }

  type Product {
    _id: ID!
    name: String!
    price: Float!
    description: String!
    category: [String!]!
    comment: [Comment!]!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]! # A list of products in this category
  }

  #timestamp needs to be set to current time
  type Comment {
    id: ID!
    username: String!
    text: String!
    timestamp: String!
  }

  # Auth type to handle returning data from a profile creating or user login
  type Auth {
    token: ID!
    user: User
  }

  # query to look for current user
  type Query {
    me: User
  }

  # add new user and login user
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveProduct(Product: ProductData!): User
    removeProduct(ProductId: String!:) User
  }
`;

module.exports = typeDefs;
