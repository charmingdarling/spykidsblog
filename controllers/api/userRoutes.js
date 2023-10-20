const router = require("express").Router();
const { User } = require("../../models");

// endpoint `/` will be http://localhost:3001/api/user/register/
// it is a lowercase `u`, because it refers to userRoutes, not User model
router.post("/", async (req, res) => {
  console.log("Line 7 Registration");
  try {
    const newUserData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = newUserData.id;
      req.session.username = newUserData.username;
      req.session.logged_in = true;
      res.status(200).json(newUserData);
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const newUserData = await User.findOne({ where: { email: email } });
    const validPassword = await newUserData.checkPassword(password);
    if (!newUserData && validPassword) {
      req.session.save(() => {
        req.session.user_id = newUserData.id;
        req.session.username = newUserData.username;
        req.session.logged_in = true;
        res.status(200).json(newUserData);
      });
    } else {
      res.status(400).json({ message: "Login failed." });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete("/logout", (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

module.exports = router;
