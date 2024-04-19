// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const userRoutes = require("./routes/userRoutes");
// const articleRoutes = require("./routes/articleRoutes");

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal server error" });
// });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/articles", articleRoutes);

// // Start server
// app.listen(PORT, () => {});
const express = require("express");
// const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
// const { requestLogger, errorLogger } = require("./middleware/logger");

const app = express();
const { PORT = 3001 } = process.env;

// Log API requests
// app.use(morgan("common", { stream: requestLogger.stream }));
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
