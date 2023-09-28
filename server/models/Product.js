const { Schema, model } = require("mongoose");

const productSchema = new Schema({
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
    default: 0,
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
    },
  ],
  comment: [
    {
        user: String,
        text: String,
        timestamp: {
            type: Date,
            default: Date.now, // Set the default value to the current date and time
          },
    }
  ],
});

const Product = model("Product", productSchema);

module.exports = Product;
