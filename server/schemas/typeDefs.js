const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # user that takes id, username, email, password and products in an array
  type User {
    _id: ID!
    username: String!
    email: String!
    productCount: Int! #items in cart at the time
    cart: [Product]!
  }

  type Product {
    _id: ID!
    name: String!
    price: Float!
    description: String!
    category: [String!]!
    comment: [Comment!]!
  }

  input ProductData {
    name: String!
    price: Float!
    quantity: Int!
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
    token: String!
    user: User
  }

  # query to look for current user
  type Query {
    me: User
    allCategories: [Category!]!
    allProducts: [Product!]!
  }

  # add new user and login user
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addToCart(Product: ProductData!): User
    removeFromCart(ProductId: String!): User
  }
`;

module.exports = typeDefs;
