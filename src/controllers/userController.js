const User = require("../models/user");
const { NotFoundError } = require("../../utils/NotFoundError");
const { USER_NOT_FOUND } = require("../../utils/constants");

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(USER_NOT_FOUND));
      } else {
        next(err);
      }
    });
};
module.exports = {
  getUserInfo,
};
