// import authentificationerror , usermodel and signToken
const { AuthentificationError } = require("apollo-server-express");
const { User, Category, Comment, Product, Cart } = require("../models");
const { signToken } = require("../utils/auth");

// resolver to query current logged_in user
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({
          //populates the user's cart.products path
          path: "cart.product",
          populate: "name",
        });
      }
      throw new AuthentificationError("You need to be logged in!");
    },
    allCategories: async () => {
      return await Category.find({}).populate("products");
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

        console.log(user, "Login Successful!");
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
    addToCart: async (_, { product }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }

      try {
        // Find the user by their _id
        const user = await User.findById(context.user._id).populate({
          path: "cart.product",
          select: "_id name description price",
        });
        if (!user) {
          throw new Error("User not found");
        }

        // Find the product by its _id
        const foundProduct = await Product.findById(product.productId);
        if (!foundProduct) {
          throw new Error("Product not found");
        }
        /*
        console.log("product information", product);
        console.log('user',user)
        console.log('foundProduct',foundProduct)
        console.log('product.productId', product.productId)
        console.log('usercart:',user.cart); //empty array, makes sense at the beginning*/

        //returns false when just cartItem.product
        //console.log('existingCartItem',existingCartItem); //returns undefined all the time
        //console.log(product.productId); returning correctly
        //console.log(product.quantity); returning correctly

        //restructuring the function solved hte issues
        const existingCartItem = user.cart.find(function (cartItem) {
          return cartItem.product._id.toString() === product.productId;
        });

        if (existingCartItem) {
          // If the product already exists in the cart, update its quantity
          existingCartItem.quantity += product.quantity || 1;
        } else {
          // If the product doesn't exist in the cart, add it as a new cart item
          user.cart.push({
            product: foundProduct, // Use the actual product object here
            quantity: product.quantity || 1,
          });
        }

        // Update the cart count based on the quantity added
        user.cartCount += product.quantity || 1;

        // Save the updated user document with the cart
        await user.save();

        return user;
      } catch (error) {
        console.error("Error in addToCart resolver:", error);
        throw error;
      }
    },
    removeFromCart: async (_, { productId }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }

      try {
        // Find the user by their _id
        const user = await User.findById(context.user._id);

        if (!user) {
          throw new Error("User not found");
        }

        // Find the index of the cart item with the specified productId
        const indexToRemove = user.cart.findIndex(
          (item) => item.product && item.product.toString() === productId
        );

        if (indexToRemove === -1) {
          throw new Error("Product not found in the cart");
        }

        // Remove the cart item from the user's cart
        user.cart.splice(indexToRemove, 1);

        // Update the cart count based on the removal
        user.cartCount--;

        // Save the updated user document with the cart removed
        await user.save();

        return user;
      } catch (error) {
        console.error("Error in removeFromCart resolver:", error);
        throw error;
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
        const user = await User.findById(context.user._id);
        // Clear the user's cart by setting it to an empty array
        user.cart = [];

        // Save the updated user data
        await user.save();

        // Return the updated user data
        return user;
      } catch (err) {
        console.log(err);
        throw new Error("Error clearing cart");
      }
    },
    addComment: async (_, { productId, comment }, context) => {
      // Check for user authentication
      if (!context.user) {
        throw new Error("Authentication required");
      }

      try {
        // Fetch the user data for the authenticated user
        const user = await User.findById(context.user._id);

        if (!user) {
          throw new Error("User not found");
        }

        // Fetch the product by its productId
        const product = await Product.findById(productId).populate('comment.user');
        if (!product) {
          throw new Error("Product not found");
        }

        // Create a new comment
        const newComment = new Comment({
          user: context.user, // Assuming you have a user associated with the comment
          text: comment.text,
        });

        // Add the new comment to the product's comment array
        product.comment.push(newComment);

        // Save the updated product
        await product.save();

        // Return the updated product, including the new comment
        return product;
      } catch (error) {
        console.error(error);
        throw new Error("Error adding comment");
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
