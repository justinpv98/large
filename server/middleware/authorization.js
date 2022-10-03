const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {jwtSecrets} = require("../config/config")

const User = require("../models/UserModel");

module.exports = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, jwtSecrets.refresh);
      req.user = await User.findById(decodedToken.id).select("-password");
      req.user.token = token
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  } else if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});