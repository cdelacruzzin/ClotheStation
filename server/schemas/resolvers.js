// import authentificationerror , usermodel and signToken
const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Comment, Product, Cart } = require("../models");
const { signToken } = require("../utils/auth");
const uuid = require('uuid');
// import stripe and use stripe api for testing
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
      console.log('querying categories')
      return await Category.find({}).populate("products");
    },
    allProducts: async () => {
      return await Product.find({}).populate('category');
    },
    // get products tye categories of the carts products for a single user
    // cart: async (parent, { _id }, context) => {
    cart: async (parent, args, context) => {

      // TODO: use try catch
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'cart.product',
          populate: 'category',
        });

        return user.cart.id(_id);
      }

      throw new AuthentificationError('Not logged in');
    },
    checkout: async (parent, args, context) => {

      const url = new URL(context.headers.referer).origin;
      // console.log({url})
      // Map through list of products sent bt the client to extract id of each item and create new order in order to purchase
      await Cart.create({ products: args.products.map(({ _id }) => _id) });
      const line_items = [];


      // console.log(args.products)

      for (const product of args.products) {
        line_items.push({
          price_data: {
            // display price in cad
            currency: 'cad',
            // fill with current product data
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`],
            },
            unit_amount: Math.round(product.price * 100),
            // unit_amount: product.price *100,
          },
          // display quantity of products
          quantity: product.purchaseQuantity,
        });
      }
      console.log(line_items)

      try {
        // checkout with stripe and create a new stripe checkout session
        const session = await stripe.checkout.sessions.create({
          // use card as payment method
          payment_method_types: ['card'],
          // line ordered items for payment
          line_items,
          mode: 'payment',
          // create success and cancel urls
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`,
        });

        console.log('session')
        return { session: session.id };
      } catch (error) {
        console.error("Error creating checkout session:", error);
        // Handle the error accordingly, you can also send a response to the client if this is part of an API endpoint.
      }



    },
    product: async (parent, { _id }) => {
      const product = await Product.findById(_id).populate('category');
      return product;
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
          throw new AuthenticationError(
            "No user found with this email address"
          );
        }
        //console.log('user:',user)
        //console.log('password:',password)

        const correctPw = await user.isCorrectPassword(password);
        console.log({ correctPw })
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const token = signToken(user);
        console.log({ user })
        console.log({ token })

        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },


    addToCart: async (_, { product }, context) => {

      // console.log({product})
      if (!context.user) {
        throw new Error("Authentication required");
      }

      try {
        // Find the user by their _id
        const user = await User.findById(context.user._id)


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


        const cartItemIndex = user.cart.findIndex(cartItem => cartItem.product.toString() === product.productId);

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
          path: 'cart.product',
          select: '_id name description price',
          populate: {
            path: 'category',
            select: 'name'
          }
        });

        console.log(JSON.stringify(populatedUser, null, 3));
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
        // Fetch the product by its productId
        const product = await Product.findById(productId);
        if (!product) {
          throw new Error("Product not found");
        }
        console.log(comment)
        // Create a new comment
        const newComment = new Comment({
          user: context.user._id, // Assuming you have a user associated with the comment
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
    applyAggregate: async (_, { ProductData }) => {

      try {
        const result = await User.aggregate([
          { $unwind: "$savedProducts" },
          {
            $group: {
              _id: "$username",
              totalAmount: { $sum: "$savedProducts.quantity" }
            }
          }
        ])
        console.log(result)
      } catch (error) {
        console.error(error)
      }

    },

    saveProduct: async (_, { ProductData }, context) => {
      try {
        const { _id } = context.user;

        const product = await Product.findOne(
          { name: ProductData.name }
        )
        const productId = product._id;

        const user = await User.findById(_id).populate('savedProducts');

        const index = user.savedProducts.some(p => p.product.toString() === (productId && productId.toString()));

        if (index) {
          try {
            const update = await User.findByIdAndUpdate(
              _id,
              { $pull: { savedProducts: { product: productId } } },
              { new: true, useFindAndModify: false },
            )
              .populate('savedProducts.product')

            console.log(JSON.stringify(update, null, 2));
            return update;
          } catch (error) {
            console.error(error);
          }
        }
        else {
          // Product isn't in savedProducts, so we add it with a quantity of 1
          const newSavedProduct = {
            quantity: 1,
            product: productId  // Assuming ProductData._id contains the ObjectId of the product
          };
          const update = await User.findByIdAndUpdate(
            _id,
            { $push: { savedProducts: newSavedProduct } },
            { new: true, useFindAndModify: false },
          ).populate('savedProducts.product');
          console.log(JSON.stringify(update, null, 2));
          return update;
        }

      } catch (error) {
        console.error(error);
      }
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
