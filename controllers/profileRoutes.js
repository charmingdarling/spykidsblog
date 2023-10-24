const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// display route,

// get one user with serialized data
router.get("/user/:id", withAuth, async (req, res) => {
  try {
    // search database for a dish with an id that matches params
    const userData = await User.findByPk(req.params.id);
    console.log(`${userData} LINE 12ish`);
    // use .get({ plain: true }) on the
    const user = userData.get({ plain: true });
    // then, `user` template is rendered and userData is passed
    res.render("profile", userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { id: req.session.user_id },
      include: [
        {
          model: Post,
          include: [
            {
              model: Comment,
              include: [User],
            },
          ],
        },
      ],
    });
    const user = userData.get({ plain: true });
    console.log(user);
    res.render("profile", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { id: req.session.user_id },
      include: [
        {
          model: Post,
          include: [
            {
              model: Comment,
              include: [User],
            },
          ],
        },
      ],
    });
    const user = userData.get({ plain: true });
    console.log(user);
    res.render("profile", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/login");
  }
  res.render("login");
});

// exporting the router so it can be in the index
module.exports = router;
