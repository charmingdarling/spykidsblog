// Router called to listen to different endpoints
const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const profileRoutes = require("./profileRoutes");

// Front-end request
// The requests in between the " _ " incoming from the user.
// http://localhost:3001/
// http://localhost:3001/api
// http://localhost:3001/profile

// Then if we are getting a request for one of those endpoints, THEN, use the routes.
// - then use homeRoutes, apiRoutes, or profileRoutes to handle the requests

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/profile", profileRoutes);

// exporting the router so it can be in the index
module.exports = router;
