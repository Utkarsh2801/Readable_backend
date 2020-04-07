const ErrorResponse = require("../utils/errorResponse");

const errorHandler = function (err, req, res, next) {
  //Log to console for dev
  let error = { ...err };
  console.log(err);
  error.message = err.message;
  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }

  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  console.log(err.statusCode);
  res.status(error.statusCode || 500).json({
    success: false,
    errors: error.message || "Server error",
  });
};

module.exports = errorHandler;
