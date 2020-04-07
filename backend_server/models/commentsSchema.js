const mongoose = require("mongoose");
const timeStamp = require("time-stamp");

const commentsSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    default: timeStamp(),
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  votescore: {
    type: Number,
    default: 0,
  },
});

const Comments = mongoose.model("Comment", commentsSchema);

module.exports = Comments;
