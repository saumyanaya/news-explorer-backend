function errorMiddleware(err, req, res, next) {
  err({
    message: err.message,
    stack: err.stack,
  });
  next();
  res.status(err.status || 500).json({ error: err.message });
}

module.exports = errorMiddleware;
