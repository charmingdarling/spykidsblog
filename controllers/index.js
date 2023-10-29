const router = require("express").Router(); // Router called to listen to different endpoints

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const profileRoutes = require("./profileRoutes");

// Front-end request " " incoming from user; after the comma is what we call the request handler
router.use("/", homeRoutes); // http://localhost:3001/
router.use("/api", apiRoutes); // http://localhost:3001/api
router.use("/profile", profileRoutes); // http://localhost:3001/profile

module.exports = router; // exporting the router so it can be in the index
