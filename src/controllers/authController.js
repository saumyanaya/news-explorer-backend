const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../../utils/BadRequestError");
const User = require("../models/user");
const authMiddleware = require("../../middleware/authMiddleware");
const { ConflictError } = require("../../utils/ConflictError");
const { UnauthorizedError } = require("../../utils/UnauthorizedError");
const {
  VALID_EMAIL,
  EMAIL_IN_USE,
  INVALID_CREDENTIALS,
  CREATE_USER_INVALID,
} = require("../../utils/constants");
const { JWT_SECRET, NODE_ENV } = require("../../utils/config");

exports.signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!email) {
        return next(new BadRequestError(VALID_EMAIL));
      }
      if (user) {
        return next(new ConflictError(EMAIL_IN_USE));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      const userPayload = user.toObject();
      delete userPayload.password;
      res.status(201).send({
        data: userPayload,
      });
    })

    .catch((err) => {
      if (err.name === `ValidationError`) {
        next(new BadRequestError(CREATE_USER_INVALID));
      } else if (err.message === "Enter a valid email") {
        next(new BadRequestError(CREATE_USER_INVALID));
      } else if (err.message === "Email is already in use") {
        next(new ConflictError(EMAIL_IN_USE));
      } else {
        next(err);
      }
    });
};

exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError(INVALID_CREDENTIALS));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        },
      );
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError(INVALID_CREDENTIALS));
      } else {
        next(err);
      }
    });
};

exports.protectedRoute = authMiddleware;
