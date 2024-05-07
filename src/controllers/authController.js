const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { NODE_ENV, JWT_SECRET } = require("../../utils/config");

exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    console.log("user email is : " + email);
    // Check if user with provided email already exists
    let user = await User.findOne({ email });
    console.log("user  is : " + user);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT

    const payload = {
      user: {
        _id: user._id,
      },
    };
    try {
      const token = await new Promise(() => {
        jwt.sign(
          payload,
          NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret",
          { expiresIn: "7d" },
        );
      });

      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ message: "Error signing JWT" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
