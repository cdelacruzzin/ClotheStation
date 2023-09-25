const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: Number,
            required: true,
        },
    }
)

const Comment = model('Comment', commentSchema);

module.exports = Comment;