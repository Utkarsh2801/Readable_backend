const mongoose = require("mongoose");
const color = require("color");
const Categories = require("./models/CategoriesSchema");
const Posts = require("./models/postsModel");
const Comments = require("./models/commentsSchema");
const Users = require("./models/UsersModel");

const fs = require("fs");

mongoose.connect("mongodb://localhost:27017/readable", {
  useNewUrlParser: true,
});

async function enterData() {
  const posts = JSON.parse(fs.readFileSync("./data/posts.json"));
  const comments = JSON.parse(fs.readFileSync("./data/comments.json"));
  const categories = JSON.parse(fs.readFileSync("./data/category.json"));
  const users = JSON.parse(fs.readFileSync("./data/users.json"));

  await Categories.create(categories);
  await Posts.create(posts);
  await Comments.create(comments);
  await Users.create(users);
}

async function deleteData() {
  await Categories.deleteMany({});
  await Posts.deleteMany({});
  await Comments.deleteMany({});
  await Users.deleteMany({});
}

if (process.argv[2] === "-i") enterData();
else if (process.argv[2] === "-d") deleteData();
