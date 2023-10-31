// Set up Express router, responsible for parsing incoming JSON requests.
// Auto parses request body if the 'Content-Type' header is set to "application/json"
const router = require("express").Router();
const { User, Post } = require("../../models"); // Require User, Post models from models folder
const withAuth = require("../../utils/auth"); // Import middleware function for authentication, checking if user is logged in before they can use a route

// ! Remember: Never navigate to an API route
// You can SEND a FETCH request to an API route, it's BTS work, just sending back data
// `api` only appears in insomnia - on the browser url, it never shows up
// it is a lowercase `u`, because it refers to userRoutes, not User model

// Route to handle post endpoint (POST Request)
// http://localhost:3001/api/user/post/
router.post("/", withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPostCreated = await Post.create({
      title,
      content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPostCreated);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Route to handle updating a post (PUT Request)
// http://localhost:3001/api/post/:id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateData = await Post.update(req.params.id);
    // req.body is the updateData
    const { title, content } = req.body;
    await updateData.update({
      title,
      content,
    });

    res.status(200).json(updateData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// * -------------------
const date = new Date();

const formatDate = (date) => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
};

// Route to handle getting a singlepost (GET Request)
// http://localhost:3001/api/post/singlepost/:id
// router.get("/singlepost/:id", async (req, res) => {
//   try {
//     const postData = await Post.findOne({
//       where: {
//         id: req.params.id,
//       },
//     });

//     // Check if post data found
//     if (!postData) {
//       return res.status(404).json({ message: "Post not found." });
//     }

//     // Format date
//     const formattedPost = {
//       ...postData.get({ plain: true }),
//       date_created: formatDate(postData.date_created),
//     };

//     // Render the "singlepost" view with the formatted post data
//     res.render("singlepost", {
//       post: formattedPost,
//       user: req.session.username,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// Router to delete a post
// http://localhost:3001/api/post/:id
// Could have (routers.get) GET, but DELETE makes more sense
router.delete("/:id", withAuth, async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router; // exporting the router so it can be in the index
