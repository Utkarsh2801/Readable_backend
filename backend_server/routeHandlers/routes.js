const asyncHandler = require("../Handlers/asyncHandlers");
const Categories = require("../models/CategoriesSchema");
const Posts = require("../models/postsModel");
const Comments = require("../models/commentsSchema");
const Users = require("../models/UsersModel");
const capitalize = require("capitalize");
const ErrorResponse = require("../utils/errorResponse");
const { sendJWTToken } = require("../Handlers/auth");

exports.getCategories = asyncHandler(async (req, res, next) => {
  let data = await Categories.find({}).populate("posts");

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: data,
  });
});

exports.postForCategory = asyncHandler(async (req, res, next) => {
  let category = capitalize(req.params.category);
  let data = await Categories.find({
    category: category,
  }).populate("posts");

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: data[0].posts,
  });
});

exports.getAllPost = asyncHandler(async (req, res, next) => {
  let data = await Posts.find({}).populate("comments").populate("category");

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: data,
  });
});

exports.addPost = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse("Please login or register first", 401));
  }

  let data = await Posts.create(req.body);

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: data,
  });
});

exports.singlePost = asyncHandler(async (req, res, next) => {
  let data = await Posts.findOne({ _id: req.params.id }).populate("category");

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: data,
  });
});

exports.votePost = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse("Please login or register first", 401));
  }
  let option = req.body.option;
  let quantity;

  if (option === "upVote") quantity = 1;
  else if (option === "downVote") quantity = -1;
  else {
    res.status(400).json({
      success: false,
      msg: "please upVote or downVote",
    });
  }

  let data = await Posts.findByIdAndUpdate(
    req.params.id,
    { $inc: { votescore: quantity } },
    {
      new: true,
    }
  );

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: data,
  });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  let data = await Posts.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: data,
  });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  let data = await Posts.findById(req.params.id);

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }

  data.remove();

  res.status(200).json({
    success: true,
    data: data,
  });
});

exports.commentsForSinglePost = asyncHandler(async (req, res, next) => {
  let data = await Posts.findById(req.params.postId).populate("comments");

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: data.comments,
  });
});

exports.addComment = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse("Please login or register first", 401));
  }
  let data = await Comments.create(req.body);

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: data,
  });
});

exports.getSingleComment = asyncHandler(async (req, res, next) => {
  let data = await Comments.findById(req.params.id);

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: data,
  });
});

exports.voteComment = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse("Please login or register first", 401));
  }
  let option = req.body.option;
  let quantity;

  if (option === "upVote") quantity = 1;
  else if (option === "downVote") quantity = -1;
  else {
    res.status(400).json({
      success: false,
      msg: "please upVote or downVote",
    });
  }

  let data = await Comments.findByIdAndUpdate(
    req.params.id,
    { $inc: { votescore: quantity } },
    {
      new: true,
    }
  );

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: data,
  });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  let data = await Comments.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }
  res.status(200).json({
    success: true,
    data: data,
  });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  let data = await Comments.deleteOne({ _id: req.params.id });

  if (!data) {
    return next(new ErrorResponse("Resource Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: data,
  });
});

exports.register = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  const user = await Users.create({
    firstname,
    lastname,
    email,
    password,
  });

  sendJWTToken(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please Enter Email and Password both", 401));
  }
  const user = await Users.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("User Not found", 400));
  }

  if (await user.matchPassword(password)) {
    sendJWTToken(user, 200, res);
  } else {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  return;
});
