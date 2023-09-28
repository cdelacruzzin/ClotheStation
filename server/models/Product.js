const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        _id: {
            type: String
        },
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
        category: [
            {
              type: Schema.Types.ObjectId,
              ref: "Category", // Reference to the Category model
            },
          ],
          comment: [
            {
              type: Schema.Types.ObjectId,
              ref: "Comment", // Reference to the Comment model
            },
        ]
    })

const Product = model('Product', productSchema);

module.exports = Product;