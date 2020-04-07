const express = require("express");

const {
  getCategories,
  postForCategory,
  getAllPost,
  addPost,
  singlePost,
  votePost,
  updatePost,
  deletePost,
  commentsForSinglePost,
  addComment,
  getSingleComment,
  voteComment,
  updateComment,
  deleteComment,
  register,
  login,
} = require("../routeHandlers/routes");

const Router = express.Router();

Router.route("/categories").get(getCategories);

Router.route("/:category/posts").get(postForCategory);

Router.route("/posts").get(getAllPost).post(addPost);

Router.route("/posts/:id")
  .get(singlePost)
  .post(votePost)
  .put(updatePost)
  .delete(deletePost);

Router.route("/posts/:postId/comments").get(commentsForSinglePost);

Router.route("/comment").post(addComment);

Router.route("/comment/:id")
  .get(getSingleComment)
  .post(voteComment)
  .put(updateComment)
  .delete(deleteComment);

Router.route("/register").post(register);

Router.route("/login").post(login);

module.exports = Router;
