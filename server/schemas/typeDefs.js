const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # user that takes id, username, email, password and products in an array
  type User {
    _id: ID!
    username: String!
    email: String!
    cartCount: Int! #items in cart at the time
    cart: [CartItem]!
  }

  type Checkout {
    session: ID
  }

  type CartItem {
    product: Product!
    quantity: Int!
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
    category: [ID!]! #reference category through IDs
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

  input CommentData {
    username: String!
    text: String!
  }

  #product input for the checkout
  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: float
    quantity: Int
  }

  # Auth type to handle returning data from a profile creating or user login
  type Auth {
    token: String!
    user: User
  }

  # query to look for current user, all categories, products, and checkout
  type Query {
    me: User
    allCategories: [Category!]!
    allProducts: [Product!]!
    checkout(products: [ProductInput]): Checkout
  }

  # add new user and login user
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addToCart(product: ProductData!): User
    removeFromCart(productId: String!): User
    addComment(productId: ID!, comment: CommentData!): Product
    clearCart: User
  }
`;

module.exports = typeDefs;
