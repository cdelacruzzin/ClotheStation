const { Schema, model } = require('mongoose');

const cartSchema = new Schema(
    {
        User: [{ type: Schema.Types.ObjectId , ref: 'User', required: true }],
        Items: [{ type: Schema.Types.ObjectId, ref: 'CartItem'}]
    }
)

const Cart = model('Cart', cartSchema);

module.exports = Cart;