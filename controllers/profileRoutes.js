const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// display route,

// get one user with serialized data
router.get("/", withAuth, async (req, res) => {
  try {
    // Set is_profile_page to true for this route - flicks the "on switch" so that it is true
    const is_profile_page = true;
    // search database for a dish with an id that matches params
    const userData = await User.findByPk(req.session.user_id, {
      include: [Post], // we want to access all the userData and include the Post model inside an array],
    }); // accessing the session with a cookie and want to make sure that whoever signs in when they click on the profile page, they get the correct profile page
    console.log(`${userData} LINE 18ish`);
    // use .get({ plain: true }) on the
    const user = userData.get({ plain: true });
    // then, `user` template is rendered and userData is passed
    res.render("profile", {
      user,
      is_profile_page: true, // set the is_profile_page property to true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id, user_id: req.session.user_id },
      include: [
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    const post = postData.get({ plain: true });
    console.log(post);
    res.render("edit", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
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
    console.log(`${user} is found and now logged in. LINE 67.`);
    res.render("profile", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// exporting the router so it can be in the index
module.exports = router;
