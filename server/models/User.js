const { Schema, model } = require("mongoose");
const CartItem = require("./CartItem");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cartCount: {
    type: Number,
    default: 0, // You can set a default value if needed
  },
  cart: [
    {
        product: {
          type: String, // Assuming your product ID is a string (UUID)
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
    }
  ],
});

const User = model("User", userSchema);

module.exports = User;
