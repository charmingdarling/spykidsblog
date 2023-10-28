const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// ! Remember: Never navigate to an API route
// You can SEND a FETCH request to an API route, it's BTS work, just sending back data
// endpoint `/` will be http://localhost:3001/api/user/register/
// it is a lowercase `u`, because it refers to userRoutes, not User model
router.post("/", async (req, res) => {
  console.log("Line 10 Registration");

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
    const newUserData = await User.findOne({
      where: { email: req.body.email },
    });
    console.log(newUserData + "THIS IS LINE 31 OF userRoutes.js");
    const validPassword = await newUserData?.checkPassword(req.body.password);
    console.log(validPassword + "THIS IS LINE 33 OF userRoutes.js");
    // !Why is this failing? Not finding user? checkPassword is wrong?
    if (newUserData && validPassword) {
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

// Could have (routers.get) GET, but DELETE makes more sense
router.delete("/logout", (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

router.put("/update/pass", withAuth, (req, res) => {
  try {
    const [rowsChanged] = User.update(
      { password: req.body.password },
      {
        where: {
          id: req.session.user_id,
        },
      }
    );

    res.json(
      rowsChanged > 0
        ? res.json({ message: rowsChanged + " rows changed" })
        : res.status(404).end()
    );
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
