// Set up Express router, responsible for parsing incoming JSON requests.
// Auto parses request body if the 'Content-Type' header is set to "application/json"
const router = require("express").Router();
const { User, Post } = require("../models"); // Require User, Post models from models folder
const withAuth = require("../utils/auth"); // Import middleware function for authentication, checking if user is logged in before they can use a route

// Route to handle homepage root endpoint with findAll(), (GET request)
// http://localhost:3001/
router.get("/", async (req, res) => {
  try {
    // get all posts and JOIN with user data
    // purpose of this code is to convert an array of Sequelize model instances into an array of plain JS objects.
    // This is often done when passing data to templates for rendering or when preparing data for a JSON response.
    // Plain JS objects are easier to work with in different contexts than the Sequelize model instances
    const postData = await Post.findAll({
      include: [{ model: User }],
      order: [["createdAt", "DESC"]],
    });

    // serialize data so the template can read it
    // postData = array of Sequelize model instances representing posts
    // map over each element in postData array to get 'plain: true'
    // {plain: true} = indicates that the result should be plain JS object without any Sequelize-specific metadata
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    // pass serialized data and session flag into the template
    res.render("homepage", {
      // render an HTML view named 'homepage' as first argument, second argument is an object containing data that will be passed to the view for rendering
      posts,
      logged_in: req.session.logged_in, // include information about whether a user is logged in when rendering views, conditionally show different content based on user authentication status
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to handle login endpoint (GET request)
// http://localhost:3001/login
router.get("/login", (req, res) => {
  // conditionally checks if user is logged in by examining 'logged_in' property in the 'req.session' object
  if (req.session.logged_in) {
    return res.redirect("/"); // if truthy, redirect them to homepage endpoint
  }
  res.render("login");
});

// Route handling to show signup form (GET request)
// http://localhost:3001/signup
router.get("/signup", async (req, res) => {
  try {
    res.render("signup"); // Show the signup form
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route handle to a single post with findOne() by 'id', (GET request)
// http://localhost:3001/signup/:id
router.get("/singlepost/:id", async (req, res) => {
  try {
    // Fetch the post data with the associated user data
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
    // Convert the Sequelize model instance to a plain JavaScript object
    const post = postData.get({ plain: true });
    console.log(post);
    // If the post data is retrieved, the route handler renders the "singlepost" view by...
    res.render("singlepost", {
      post, // ... passing the post data
      user: req.session.username, // ... the username from the session
      logged_in: req.session.logged_in, // ... the login status ... all as variables that can be used in the view
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// exporting the router so it can be in the index
module.exports = router;
