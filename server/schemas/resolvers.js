// import authentificationerror , usermodel and signToken
const { AuthentificationError } = require("apollo-server-express");
const { User, Category, Comment, Product } = require("../models");
const { signToken } = require("../utils/auth");

// resolver to query current logged_in user
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("products");
      }
      throw new AuthentificationError("You need to be logged in!");
    },
    allCategories: async () => {
      return await Category.find({});
    },
    allProducts: async () => {
      return await Product.find({});
    },
    /*
    allUsers: async () => {
      return await User.find({});
    },
    allComments: async () => {
      return await Comment.find({});
    },*/
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthentificationError(
          "No user found with this email address"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthentificationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    // Mutation to add a product to the user's cart
    addToCart: async (_, { productData }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }

      try {
        // Check if the user already has the product in their cart
        const existingCartItemIndex = context.user.cart.findIndex(
          (item) => item.product === productData.productId
        );

        if (existingCartItemIndex !== -1) {
          // If the product already exists in the cart, update its quantity
          context.user.cart[existingCartItemIndex].quantity +=
            productData.quantity; //reference this inside input productData
        } else {
          // If the product doesn't exist in the cart, add it
          context.user.cart.push({
            product: productData.productId,
            quantity: productData.quantity,
          });
        }

        // Save the updated user data
        await context.user.save();

        // Return the updated user data
        return context.user;
      } catch (err) {
        console.log(err);
        throw new Error("Error adding product to cart");
      }
    },
    // Mutation to remove a product from the user's cart
    removeFromCart: async (_, { productId }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }

      try {
        // Find the index of the product in the user's cart
        const cartItemIndex = context.user.cart.findIndex(
          (item) => item.product === productId
        );

        if (cartItemIndex !== -1) {
          // Remove the product from the cart
          context.user.cart.splice(cartItemIndex, 1);

          // Save the updated user data
          await context.user.save();

          // Return the updated user data
          return context.user;
        } else {
          throw new Error("Product not found in cart");
        }
      } catch (err) {
        console.log(err);
        throw new Error("Error removing product from cart");
      }
    },
    //mutation to clear the cart after purchase :)
    clearCart: async (_, __, context) => {
      //check for authentication
      //if were implementing userless checkout this needs to be changed
      if (!context.user) {
        throw new Error("Authentication required");
      }

      try {
        // Clear the user's cart by setting it to an empty array
        context.user.cart = [];

        // Save the updated user data
        await context.user.save();

        // Return the updated user data
        return context.user;
      } catch (err) {
        console.log(err);
        throw new Error("Error clearing cart");
      }
    },
  },
  User: {
    // Resolver function for the "cartCount" field
    cartCount: (user) => {
      return user.cart.length;
    },
  },
};

module.exports = resolvers;
