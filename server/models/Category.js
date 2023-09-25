const { Schema, model } = require('mongoose');

const catergorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    }
)

const Category = model('Category', catergorySchema);

module.exports = Category;