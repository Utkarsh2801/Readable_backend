const mongoose = require("mongoose");
const timeStamp = require("time-stamp");

const postSchema = mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: timeStamp(),
    },
    title: {
      type: String,
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
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    votescore: {
      type: Number,
      default: 0,
    },
  },
  { id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

postSchema.pre("remove", async function (next) {
  await this.model("Comment").deleteMany({ postId: this._id });
  next();
});

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
  justOne: false,
});

postSchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: false,
});

const Posts = mongoose.model("Post", postSchema);

module.exports = Posts;
