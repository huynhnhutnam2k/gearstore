const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyTokenUser = async (req, res, next) => {
  let token;

  if (req.headers.token) {
    try {
      token = req.headers.token.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // req.user = await User.findById(decoded._id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized , token failed");
    }
  } else {
    throw new Error("Not authorized , token");
  }
};

const verifyTokenAdmin = async (req, res, next) => {
  let token;

  if (req.headers.token) {
    try {
      token = req.headers.token.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded._id).select("-password");
      if (user.isAdmin) {
        req.user = user;
        next();
      }
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized , token failed");
    }
  } else {
    throw new Error("Not authorized admin");
  }
};

module.exports = { verifyTokenAdmin, verifyTokenUser };
