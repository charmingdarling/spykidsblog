const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

// // Note: If you are in your homeRoutes, you may need to change this to /register to get register.handlebars

// router.get("/", async (req, res) => {
//   try {
//     const postData = await Post.findAll({
//       include: [
//         {
//           model: User,
//         },
//       ],
//     });
//     const posts = postData.map((post) => post.get({ plain: true }));

//     req.session.save(() => {
//        // set up a session variable to count the number of times we visit the homepage
//       if (req.session.countVisit) {
//       // if the `countVisit` session variables already exists, increment it by 1
//       req.session.countVisit++;
//       } else {
//       // if the `countVisit` session doesn't exist, set it to 1
//       } req.session.countVisit = 1;

//       res.render('/profile', {
//         posts,
//         // send over the current `countVisit` session variable to be rendered
//         countVisit: req.session.countVisit,
//       });
//     });
//   } catch(err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

//     // Pass serialized data and session flag into template
//     // When using `res.render`, you provide the view name without a leading slash'/'
//     res.render("homepage", {
//       posts,
//       logged_in: req.session.logged_in,
//     })
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// http://localhost:3001/login

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/login");
  }
  res.render("login");
});

module.exports = router;
