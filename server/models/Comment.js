const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
          timestamp: {
            type: String,
            default: () => new Date().toISOString(), // Set the default value to the current date and time
          },
    }
)

const Comment = model('Comment', commentSchema);

module.exports = Comment;