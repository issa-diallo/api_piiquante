const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Get the token from the request header.
    const token = req.headers.authorization.split(" ")[1];
    // Verify the token.
    const decoded = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    // Add the userId to the request object.
    const userId = decoded.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
