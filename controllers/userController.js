const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.Model");

/**
 * Create a new user in the database and  the created user in the response.
 */
exports.signup = async (req, res, next) => {
  // create a new user
  const user = new User({
    ...req.body,
    // hash the password with the bcrypt algorithm
    password: await bcrypt.hash(req.body.password, 10),
  });
  try {
    // save the user in the database
    await user.save();
    //  the user in the response
    res.status(201).json({ message: "Thank you, your user has been created!" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Sorry, an error has occured. Thank you again later!" });
  }
  next();
};
/**
 * Login a user and  a token in the response.
 */
exports.login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  /**
   * Check if the user exists
   */
  if (!user) {
    res
      .status(401)
      .json({ message: "Sorry, the email or password is incorrect!" });
  }
  //  the compare function of bcrypt to compare the password entered by the user with the hash stored in the database and  true or false
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  // if the password is not valid,  an error
  if (!isPasswordValid) {
    res
      .status(401)
      .json({ message: "Sorry, the email or password is incorrect!" });
  }
  // create a token with the userId and the secret key
  const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
    expiresIn: "24h",
  });
  //  the token in the response
  res.status(200).json({ token: token, userId: user._id });
  next();
};
