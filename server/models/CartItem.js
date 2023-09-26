const { Schema, model } = require("mongoose");

const cartItemSchema = new Schema({
  CartItems: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  Quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const CartItem = model("CartItem", cartItemSchema);

module.exports = CartItem;
