const { Schema, model } = require('mongoose');

const CartItem = require('./CartItem');

const cartSchema = new Schema(
    {
        User: [{ type: Schema.Types.ObjectId , ref: 'User', required: true }],
        Items: [CartItem]
    },
);


const Cart = model('Cart', cartSchema);

module.exports = Cart;