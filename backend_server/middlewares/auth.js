const asyncHandler = require("../Handlers/asyncHandlers");
exports.authentication = asyncHandler(async (req, res, next) => {
  next();
});
