const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const winston = require("winston");

const app = express();

// Create a write stream for request log
const requestLogStream = fs.createWriteStream(
  path.join(__dirname, "request.log"),
  { flags: "a" },
);

// Create a logger for error log
const errorLogger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

// Middleware for logging requests
app.use(morgan("combined", { stream: requestLogStream }));

// Middleware for logging errors
app.use((err, req, res, next) => {
  errorLogger.error(err.message);
  next(err);
});

// Other middleware and routes...

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal server error" });
});

app.listen(3001, () => {});
