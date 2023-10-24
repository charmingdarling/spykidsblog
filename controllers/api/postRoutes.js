const router = require("express").Router();
const { User, Post } = require("../../models");

// ! Remember: Never navigate to an API route
// You can SEND a FETCH request to an API route, it's BTS work, just sending back data

// endpoint `/` will be http://localhost:3001/api/user/post/
// it is a lowercase `u`, because it refers to userRoutes, not User model
router.post("/", async (req, res) => {
  console.log("Line 10 Registration");

  try {
    await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json({ message: "Post successfully created." });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  console.log("Line 10 Registration");

  try {
    await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Post successfully updated." });
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
