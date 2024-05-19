const express = require("express");

const mongoose = require("mongoose");

const helmet = require("helmet");

const cors = require("cors");

require("dotenv").config();

const limiter = require("./utils/rateLimiter");

const errorHandler = require("./middleware/errorHandler");

const userRoutes = require("./src/routes/userRoutes");

const index = require("./src/routes/index");

const articleRoutes = require("./src/routes/articleRoutes");

const { errorLogger, requestLogger } = require("./middleware/logger");

const { MONGO_DB_CONNECTION } = require("./utils/config");

const app = express();

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

mongoose.set("strictQuery", true);

mongoose.connect(MONGO_DB_CONNECTION);

app.use(cors());

app.use(express.json());

app.use(limiter);

app.use(helmet());

app.use(errorHandler);

app.use(index);

app.use(userRoutes);

app.use(articleRoutes);

app.use(errorLogger);

app.use(requestLogger);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {});
