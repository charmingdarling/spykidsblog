const router = require("express").Router();
const { User } = require("../models");

// Note: If you are in your homeRoutes, you may need to change this to /register to get register.handlebars

router.get("/", async (req, res) => {
  console.log("Line 7 router.GET of homeRoutes");
  try {
    res.render("homepage");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/profile");
  }
  res.render("login");
});

module.exports = router;
