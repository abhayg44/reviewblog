const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error("authentication failed");
    }
    const decodedToken = "supersecreat_dont_share";
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed", 403);
    return next(error);
  }
};
