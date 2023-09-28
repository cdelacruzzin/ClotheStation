const mongoose = require("mongoose");

const { Schema } = mongoose;

const catergorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Category = mongoose.model("Category", catergorySchema);

module.exports = Category;
