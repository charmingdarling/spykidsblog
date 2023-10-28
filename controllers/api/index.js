const router = require("express").Router();

const profileRoutes = require("./profileRoutes");
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

router.use("/profile", profileRoutes);
router.use("/user", userRoutes);
router.use("/post", postRoutes);

module.exports = router;
