// app.js (or index.js)

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

const cors = require("cors");

const errorMiddleware = require("./middleware/errorMiddleware");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const articleRoutes = require("./src/routes/articleRoutes");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");

app.use(cors());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        imgSrc: ["'self'"], // Allow loading images from the same origin
      },
    },
  }),
);

app.use(errorMiddleware);
app.use(authRoutes);
app.use(userRoutes);
app.use(articleRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {});
