const router = require("express").Router();
const { User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new comment (POST Request), route is private so it uses withAuth middleware
// http://localhost:3001/api/comment/
// in the public/js/comment.js file, the fetch request is sent to this route
router.post("/", withAuth, async (req, res) => {
  try {
    // Get data from the request body
    console.log(req.body); // Checking to see if the comment data is being sent by client
    const { content } = req.body;
    const commentData = await Comment.create({
      content,
      post_id: req.body.postId,
      // These are key-value pairs inside the req.body object
      user_id: req.session.user_id,
      // on the front end there is a token that is sent with the request to the backend
      username: req.session.username,
    });

    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to get all comments (GET Request)
// http://localhost:3001/api/comment/:id
router.get("/:id", withAuth, async (req, res) => {
  try {
    const postID = req.params.id;
    // Get all comments and JOIN with user data
    const commentData = await Comment.findAll({
      // This is the Comment model
      where: { post_id: postID }, // Post id
      include: [
        {
          model: User, // User model
          attributes: ["username"],
        },
      ],
    });

    // If no comments found, return an error
    if (!commentData || commentData.length < 1) {
      return res
        .status(404)
        .json({ message: "No comments found with this id" });
    }

    // res.status(200).json({ ...commentData.toJSON() });
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
