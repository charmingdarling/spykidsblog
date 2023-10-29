// INDEX ROOT CONTROLLER
const router = require("express").Router(); // Dependency called to listen to different endpoints

const apiRoutes = require("./api"); // Import API routes
const homeRoutes = require("./homeRoutes"); // Import homepage routes
const profileRoutes = require("./profileRoutes"); // Import profile routes
const renderPostRoutes = require("./renderPostRoutes"); // Import renderPost routes

// Front-end request " " incoming from user; after the comma is what we call the request handler
// Define routes and their handlers
router.use("/", homeRoutes); // http://localhost:3001/
router.use("/api", apiRoutes); // http://localhost:3001/api
router.use("/profile", profileRoutes); // http://localhost:3001/profile
// router.use("/singlepost", renderPostRoutes); // http://localhost:3001/singlepost

module.exports = router; // exporting the router so it can be in the index
