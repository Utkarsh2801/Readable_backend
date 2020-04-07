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
  logout,
} = require("../routeHandlers/routes");

const { authentication } = require("../middlewares/auth");

const Router = express.Router();

Router.route("/categories").get(authentication, getCategories);

Router.route("/:category/posts").get(authentication, postForCategory);

Router.route("/posts")
  .get(authentication, getAllPost)
  .post(authentication, addPost);

Router.route("/posts/:id")
  .get(authentication, singlePost)
  .post(authentication, votePost)
  .put(authentication, updatePost)
  .delete(authentication, deletePost);

Router.route("/posts/:postId/comments").get(
  authentication,
  commentsForSinglePost
);

Router.route("/comment").post(authentication, addComment);

Router.route("/comment/:id")
  .get(authentication, getSingleComment)
  .post(authentication, voteComment)
  .put(authentication, updateComment)
  .delete(authentication, deleteComment);

Router.route("/register").post(register);

Router.route("/login").post(login);

Router.route("/logout").post(logout);

module.exports = Router;
