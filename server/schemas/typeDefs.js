const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # user that takes id, username, email, password and products in an array
  type User {
    _id: ID
    username: String
    email: String
    password: String
    cartCount: Int #items in cart at the time
    cart: [Cart]
    savedProducts: [savedProduct]
  }

  type Checkout {
    session: ID
  }

  type Cart {
    _id: ID
    
    product: Product
    quantity: Int
  }

  input AddToCartData {
    productId: ID!
    quantity: Int!
  }

  type savedProduct {
    quantity: Int!,
    product: Product!
  }

  type Product {
    _id: ID
    name: String
    price: Float
    description: String
    imageSource: String
    category: [Category]
    comment: [Comment]
    quantity: Int
  }
  input ProductData {
    name: String!
    price: Float!
    imageSource: String!
    description: String!
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

  #product input for the checkout
  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    #quantity: Int
    imageSource: String
    description: String
  }

  # Auth type to handle returning data from a profile creating or user login
  type Auth {
    token: String
    user: User
  }



  type AggregateUserType {
    savedProductCount: Int!
  }








  # query to look for current user, all categories, products, and checkout
  type Query {
    me: User
    allCategories: [Category!]!
    allProducts: [Product!]!
    checkout(products: [ProductInput]): Checkout
    cart(_id: ID!):Cart
    product(_id: ID!): Product


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
    
    saveProduct(ProductData: ProductData): User


    applyAggregate(ProductData: ProductData!): User


    
  }
`;

module.exports = typeDefs;
//