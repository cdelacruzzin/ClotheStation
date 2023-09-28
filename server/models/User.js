const { Schema, model } = require("mongoose");

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
  cart: [cartItemSchema],
});

const User = model("User", userSchema);

module.exports = User;
