const { Schema, model } = require('mongoose');

const CartItem = require('./CartItem');

const cartSchema = new Schema(
    {
        purchaseDate: {
            type: Date,
            default: Date.now
          },
          products: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Product'
            }
          ]
    },
);
const Cart = model('Cart', cartSchema);

module.exports = Cart;