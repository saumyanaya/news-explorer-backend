const router = require("express").Router();
const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
const { signin, signup } = require("../controllers/authController");
const {
  validateSignup,
  validateSignin,
} = require("../../middleware/validation");
const { NotFoundError } = require("../../utils/NotFoundError");

router.use("/users", userRoutes);
router.use("/articles", articleRoutes);
router.delete("/articles/:articleId", articleRoutes);
router.post("/signup", validateSignup, signup);
router.post("/signin", validateSignin, signin);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found."));
});

module.exports = router;
