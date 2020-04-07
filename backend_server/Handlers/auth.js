const jwt = require("jsonwebtoken");

exports.sendJWTToken = function (user, statusCode, res) {
  token = user.getSignedjwtToken();

  res.cookie("auth", token, {
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    token: token,
  });
};
