// import authentificationerror , usermodel and signToken
const { AuthentificationError } = require("apollo-server-express");
const { User, Category, Comment, Product, Cart } = require("../models");
const { signToken } = require("../utils/auth");
const uuid = require('uuid');

// Example function to generate a unique comment ID (you would implement this)
function generateUniqueCommentId() {
  return uuid.v4();
}

// resolver to query current logged_in user
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({   //populates the user's cart.products path
          path: 'cart.products',
          populate: 'name'
        });
      }
      throw new AuthentificationError("You need to be logged in!");
    },
    allCategories: async () => {
      return await Category.find({});
    },
    allProducts: async () => {
      return await Product.find({});
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        console.log({ username, email, password });
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthentificationError(
            "No user found with this email address"
          );
        }

        // const correctPw = await user.isCorrectPassword(password);
        // if (!correctPw) {
        //   throw new AuthentificationError("Incorrect credentials");
        // }

        const token = signToken(user);

        console.log(user, 'Login Successful!');
                return { token, user };

      } catch (error) {
        console.log(error);
      }

    },
    // Mutation to add a product to the user's cart
    addToCart: async (_, { product }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");   //throws an error if user is not authenticated
      }
      try {
        const user = await User.findByIdAndUpdate(
          context.user._id,   //finds a user document by the _id
          {$push: {cart: {products: product}}},   // Pushes the provided product into the user's cart's products array.
          {new: true}, // returns the updated user document
        );
        return user;
      } catch (error) {
        console.log(error)
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
    addComment: async (_, { productId, commentData }, context) => {
      // Check if the product with the specified ID exists
      const product = productsDatabase.products.find((product) => product.id === productId);

      if (!product) {
        throw new Error('Product not found');
      }

      // Create a new comment
      const newComment = {
        id: generateUniqueCommentId(), // You'll need a function to generate unique comment IDs
        ...commentData,
        timestamp: new Date().toISOString(), // Generate timestamp
      };

      // Add the new comment to the product's comments array
      product.comments.push(newComment);

      // Return the updated product, including the new comment
      return product;
    }
  },
  User: {
    // Resolver function for the "cartCount" field
    cartCount: (user) => {
      return user.cart.length;
    },
  },
};

module.exports = resolvers;
