const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const PORT = process.env.PORT || 3001;

// Log API requests
app.use(morgan("common", { stream: requestLogger.stream }));
app.use(cors());

// Example route
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Error handling middleware
app.use((err, req, res, next) => {
  errorLogger.error({
    message: err.message,
    stack: err.stack,
  });
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");
