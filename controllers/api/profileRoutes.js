const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//! please fix the render part - no renderings or send for api routes

router.get("/newPost", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "profile",
  });
});

//! please fix the render part - no renderings or send for api routes

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const editData = await Post.findByPk(req.params.id);
    if (editData) {
      const edit = editData.get({ plain: true });
      res.render("edit", edit);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
