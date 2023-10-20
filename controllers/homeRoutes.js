const router = require("express").Router();
const { User } = require("../models");

// Note: If you are in your homeRoutes, you may need to change this to /register to get register.handlebars

router.get("/", async (req, res) => {
  console.log("Line 6 GET");
  try {
    res.render("register");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
