const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      description:
        "The user's email which they use for registration. Must be unique.",
      minLength: 5,
      maxLength: 255,
      unique: true,
      required: true,
    },
    password: {
      type: "string",
      description: "Password hash. Not returned by default.",
      required: true,
    },
    name: {
      type: "string",
      description: "Username of the user.",
      minLength: 2,
      maxLength: 30,
      required: true,
    },
  },
});
module.exports = mongoose.model("user", userSchema);
