const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # user that takes id, username, email, password and products in an array
  type User {
    _id: ID
    username: String
    email: String
    cartCount: Int
    cart: [CartItem]
  }

  type CartItem {
    product: Product
    quantity: Int
  }

  input AddToCartData {
    productId: ID!
    quantity: Int!
  }

  type Product {
    _id: ID
    name: String
    price: Float
    description: String
    imageSource: String
    category: [Category]
    comment: [Comment]
  }

  type Category {
    _id: ID
    name: String
    products: [Product]
  }

  #timestamp needs to be set to current time
  type Comment {
    _id: ID
    user: User
    text: String
    timestamp: String
  }

  input CommentData {
    text: String!
  }

  # Auth type to handle returning data from a profile creating or user login
  type Auth {
    token: String
    user: User
  }

  # query to look for current user
  type Query {
    me: User
    allCategories: [Category]
    allProducts: [Product]
  }

  # add new user and login user
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addToCart(product: AddToCartData!): User
    removeFromCart(productId: ID!): User
    addComment(productId: ID!, comment: CommentData!): Product
    removeComment(comment: ID!): Product
    clearCart: User
  }
`;

module.exports = typeDefs;
