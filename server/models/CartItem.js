const { Schema, model } = require("mongoose");

const cartItemSchema = new Schema({
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product', // Reference to the Product model
    },
    quantity: Number,
  });

const CartItem = model("CartItem", cartItemSchema);

module.exports = CartItem;