const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
    {
        _id: {
            type: String
        },
        name: {
            type: String,
            required: true,
        },
        products: [
            {
              type: Schema.Types.ObjectId,
              ref: "Product", // Reference to the Product model
            },
          ],
    }
)

const Category = model('Category', categorySchema);

module.exports = Category;