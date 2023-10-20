// import express
// .Router() - method creates a new router object
// new variable called router to store Express router instance
const router = require("express").Router();

const apiRoutes = require("./api");

const homeRoutes = require("./homeRoutes");

const navRoutes = require("./navRoutes");

// express middleware function to execute whatever matches '/'
router.use("/", homeRoutes);

// mount the apiRoutes router on the path '/nav'
router.use("/nav", navRoutes);

// mount the apiRoutes router on the path '/api'
router.use("/api", apiRoutes);

module.exports = router;
