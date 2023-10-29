// INDEX OF CONTROLLER/API
const router = require("express").Router(); // Dependency called to listen to different endpoints

// Import API routes
const profileRoutes = require("./profileRoutes");
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

// Use userRoutes for routes, connect to /user
// http://localhost:3001/user
router.use("/user", userRoutes);

// Use profileRoutes for routes, connect to /profile
// http://localhost:3001/profile
router.use("/profile", profileRoutes);

// Use userRoutes for routes, connect to /user
// http://localhost:3001/post
router.use("/post", postRoutes);

module.exports = router;
