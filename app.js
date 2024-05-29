const express = require("express");

const mongoose = require("mongoose");

const helmet = require("helmet");

const cors = require("cors");

require("dotenv").config();

const { errors } = require("celebrate");
const limiter = require("./utils/rateLimiter");

const errorHandler = require("./middleware/errorHandler");

const routes = require("./src/routes");

const index = require("./src/routes/index");

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

app.use(requestLogger);

app.use(index);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {});
