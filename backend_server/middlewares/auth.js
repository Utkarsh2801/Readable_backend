const asyncHandler = require("../Handlers/asyncHandlers");
const jwt = require("jsonwebtoken");
const Users = require("../models/UsersModel");

const jwtSectret = process.env.JWT_SECRET;

exports.authentication = asyncHandler(async (req, res, next) => {
  if (req.cookies && req.cookies.auth) {
    let token = req.cookies.auth;
    decode = await jwt.verify(token, jwtSectret);
    req.user = await Users.findById(decode.id);
    console.log(req.user);
  }
  next();
});
