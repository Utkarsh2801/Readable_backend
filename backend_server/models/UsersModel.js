const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please add a first name"],
  },
  lastname: {
    type: String,
    required: [true, "Please add a second name"],
  },
  email: {
    type: String,
    required: [true, "Please add a email"],
    match: [
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      "Please add a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minlength: 6,
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedjwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Users = mongoose.model("User", UserSchema);

module.exports = Users;
