const router = require("express").Router();
const { User, Post } = require("../../models");
const withAuth = require("../../utils/auth");

// ! Remember: Never navigate to an API route
// You can SEND a FETCH request to an API route, it's BTS work, just sending back data

// endpoint `/` will be http://localhost:3001/api/user/post/
// `api` only appears in insomnia - on the browser url, it never shows up
// it is a lowercase `u`, because it refers to userRoutes, not User model
router.post("/", async (req, res) => {
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

// Get a singlepost
// http://localhost:3001/api/post/singlepost/:id
router.get("/singlepost/:id", async (req, res) => {
  try {
    await Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Post retrieved." });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Could have (routers.get) GET, but DELETE makes more sense
router.delete("/:id", async (req, res) => {
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

module.exports = router;
