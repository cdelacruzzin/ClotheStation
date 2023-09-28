const { Schema, model } = require("mongoose");

const cartItemSchema = new Schema({
    product: {
      type: String,
      ref: 'Product', // Reference to the Product model
    },
    quantity: Number,
  });

const CartItem = model("CartItem", cartItemSchema);

module.exports = CartItem;