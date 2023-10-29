const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

// homeRoutes What the server does

router.get("/", async (req, res) => {
  try {
    // get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [{ model: User }],
      order: [["createdAt", "DESC"]],
    });

    // serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    // pass serialized data and session flag into the template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// http://localhost:3001/login
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/login");
  }
  res.render("login");
});

// Route handlling to show signup form
// http://localhost:3001/signup
router.get("/signup", async (req, res) => {
  try {
    // Show the signup form
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/singlepost/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username", "email"],
        },
      ],
    });
    console.log(req.session);
    const post = postData.get({ plain: true });
    console.log(post);
    res.render("singlepost", {
      post,
      user: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// exporting the router so it can be in the index
module.exports = router;
