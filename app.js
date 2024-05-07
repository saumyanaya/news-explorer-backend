// app.js (or index.js)

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const errorMiddleware = require("./middleware/errorMiddleware");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const articleRoutes = require("./src/routes/articleRoutes");
const { signin, signup } = require("./src/controllers/authController");

const app = express();
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");
app.use(cors());
app.use(express.json());

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
app.post("/signin", signin);

app.post("/signup", signup);
app.use(errorMiddleware);
app.use(authRoutes);
app.use(userRoutes);
app.use(articleRoutes);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {});
