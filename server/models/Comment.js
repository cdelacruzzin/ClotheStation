const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // This field should store the user's ID
    ref: "User", // This refers to the "User" model
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
