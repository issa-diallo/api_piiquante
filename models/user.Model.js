const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/**
 * User schema.
 * @type {mongoose.Schema}
 * @property {string} email - User email.
 * @property {string} password - User password.
 */
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// ensure that no two users can share the same email address.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
