// import authentificationerror , usermodel and signToken
const { AuthentificationError } = require("apollo-server-express");
const { User, Category, Comment, Product, Cart } = require("../models");
const { signToken } = require("../utils/auth");
const uuid = require("uuid");
// import stripe and use stripe api for testing
const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY ||
    "sk_test_51NvpXcItNuwzBTMWuEw91tBIEQUQPac3ajfxnn2eHcbQFCf4UJrYqkveOQ5zi8fQ6p0ZAGQEMEb7DC8PkPZmz6jy00jQMmCkpn"
);

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
    // get products tye categories of the carts products for a single user
    // cart: async (parent, { _id }, context) => {
    cart: async (parent, args, context) => {
      // TODO: use try catch
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "cart.product",
          populate: "category",
        });

        return user.cart.id(_id);
      }

      throw new AuthentificationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      //insert testMode into args
      //creates a flag that to test mode or livemmode
      const { testMode } = args;

      const url = new URL(context.headers.referer).origin;
      // Map through list of products sent bt the client to extract id of each item and create new order in order to purchase
      await Cart.create({ products: args.products.map(({ _id }) => _id) });
      const line_items = [];

      for (const product of args.products) {
        line_items.push({
          price_data: {
            // display price in cad
            currency: "cad",
            // fill with current product data
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`],
            },
            unit_amount: product.price * 100,
          },
          // display quantity of products
          quantity: product.quantity,
        });
      }

      // Define the mode based on testMode parameter
      const mode = testMode ? "payment" : "payment"; // Use "payment" for production and testing

      // For testing purposes, you can create a flag to use test card data when in test mode
      const useTestCardData = testMode;

      // If in test mode, use Stripe test card data
      if (useTestCardData) {
        // You can replace this with actual test card data from Stripe
        // For example, use card number 4242 4242 4242 4242 for success
        line_items.push({
          price_data: {
            currency: "cad",
            product_data: {
              name: "Test Product",
              description: "A product for testing",
              images: [`${url}/images/test-product.jpg`],
            },
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        });
      }

      // checkout with stripe and create a new stripe checkout session
      const session = await stripe.checkout.sessions.create({
        // use card as payment method
        payment_method_types: ["card"],
        // line ordered items for payment
        line_items,
        mode: "payment",
        // create success and cancel urls
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
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
        console.log(user);
        console.log({ token });

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
        const user = await User.findById(context.user._id);

        // console.log(user)
        if (!user) {
          throw new Error("User not found");
        }

        // Find the product by its _id
        const foundProduct = await Product.findById(product.productId);
        // console.log(foundProduct)
        // console.log("")
        // console.log(product.productId)
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

        const cartItemIndex = user.cart.findIndex(
          (cartItem) => cartItem.product.toString() === product.productId
        );

        if (cartItemIndex !== -1) {
          user.cart[cartItemIndex].quantity += product.quantity || 1;
        } else {
          user.cart.push({
            product: foundProduct._id,
            quantity: product.quantity || 1,
          });
        }
        // Update the cart count based on the quantity added
        user.cartCount += product.quantity || 1;

        await user.save();

        // Fetch and populate the user again
        const populatedUser = await User.findById(user._id).populate({
          path: "cart.product",
          select: "_id name description price",
          populate: {
            path: "category",
            select: "name",
          },
        });

        //console.log(JSON.stringify(populatedUser, null, 3));
        return populatedUser;
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
        return context.user;
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
        const product = await Product.findById(productId).populate(
          "comment.user"
        );
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
    removeComment: async (_, { commentId }, context) => {
      // Check for user authentication
      if (!context.user) {
        throw new Error("Authentication required");
      }

      try {
        // Fetch the product by its productId
        const product = await Product.findOne({ "comment._id": commentId });

        if (!product) {
          throw new Error("Product not found");
        }

        // Find the index of the comment to remove
        const commentIndex = product.comment.findIndex(
          (comment) => comment._id.toString() === commentId
        );

        if (commentIndex === -1) {
          throw new Error("Comment not found");
        }

        // Ensure that the user making the request matches the user who created the comment
        if (
          product.comment[commentIndex].user.toString() !==
          context.user._id.toString()
        ) {
          throw new Error("Unauthorized to remove this comment");
        }

        // Remove the comment from the product's comment array
        product.comment.splice(commentIndex, 1);

        // Save the updated product
        await product.save();

        // Return the updated product
        return product;
      } catch (error) {
        console.error(error);
        throw new Error("Error removing comment");
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
