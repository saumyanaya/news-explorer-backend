// app.js (or index.js)

const express = require("express");
const errorMiddleware = require("./middleware/errorMiddleware");
const userRoutes = require("./src/routes/userRoutes");
const articleRoutes = require("./src/routes/articleRoutes");

const app = express();

app.use(errorMiddleware);
app.use(userRoutes);
app.use(articleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
