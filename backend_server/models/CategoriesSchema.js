const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    category: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

categorySchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "categoryId",
  justOne: false,
});

const Categories = mongoose.model("Category", categorySchema);

module.exports = Categories;
