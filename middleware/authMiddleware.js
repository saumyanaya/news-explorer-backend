const jwt = require("jsonwebtoken");

const { JWT_SECRET, NODE_ENV } = require("../utils/config");

const { UnauthorizedError } = require("../utils/UnauthorizedError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("Authorization Required"));
    return;
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
    );
  } catch (err) {
    next(new UnauthorizedError("Authorization Required"));
    return;
  }
  req.user = payload;
  return next();
};
