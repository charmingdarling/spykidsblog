const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Display Route where you have forms and rendering

// Route to retrieve one user using findByPK() at the root endpoint
// http://localhost:3001/profile/
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

// Route to handle finding one user by 'id'
// http://localhost:3001/profile/:id
router.get("/:id", withAuth, async (req, res) => {
  try {
    // Fetch user data including associated posts and comments
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

    const user = userData.get({ plain: true }); // Convert the Sequelize MODEL instance to a plain JavaScript object
    console.log(`${user} is found and now logged in. --- LINE 51 ---.`); // Log a message indicating that the user is found and now logged in
    res.render("profile", {
      // If user data is retrieved, the route handler renders the 'profile' view passing the user data and the login status variables to be used in view
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to handle viewing all posts from a user
// http://localhost:3001/profile/posts/
router.get("/posts/:id", withAuth, async (req, res) => {
  try {
    const viewAllPosts = true; // Set viewAllPosts to true for this route
    const postData = await Post.findAll({
      where: { user_id: req.session.id },
      include: [
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    console.log(postData);
    const posts = postData.map((post) => post.get({ plain: true })); // Convert the Sequelize model instances to plain JavaScript objects
    console.log(posts);
    res.render("allPosts", {
      // Render the "profile" view with the post data and session information
      posts,
      logged_in: req.session.logged_in,
      viewAllPosts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to handle edit a specific post from a user by 'id', findOne()
// http://localhost:3001/profile/edit/:id
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const is_profile_edit_id_page = true;
    // Fetch post data including associated comments
    const postData = await Post.findOne({
      where: { id: req.params.id, user_id: req.session.user_id },
      include: [
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    const post = postData.get({ plain: true }); // Convert the Sequelize model instance to a plain JavaScript object
    console.log(post);
    res.render("edit", {
      // Render the "edit" view with the post data and session information
      post,
      logged_in: req.session.logged_in,
      is_profile_edit_id_page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Exporting the router so it can be in the index
module.exports = router;
