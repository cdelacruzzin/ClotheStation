const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        imageSource: {
            type: String,
        },
        quantity: {
            type: Number,
            min: 0,
            default: 0
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;