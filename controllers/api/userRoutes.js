// Set up Express router, responsible for parsing incoming JSON requests.
// Auto parses request body if the 'Content-Type' header is set to "application/json"
const router = require("express").Router();

const { User } = require("../../models"); // Require User model from models folder
const withAuth = require("../../utils/auth"); // Import middleware function for authentication, checking if user is logged in before they can use a route

// ! Remember: Never navigate to an API route
// You can SEND a FETCH request to an API route, it's BTS work, just sending back data
// endpoint `/` will be http://localhost:3001/api/user/register/
// it is a lowercase `u`, because it refers to userRoutes, not User model

// Route to handle registration user at root endpoint (POST request)
// http://localhost:3001/api/user/homepage
// ? If you seed your app, then users coming to the homepage would just see previous posts
router.post("/", async (req, res) => {
  try {
    const newUserData = await User.create(req.body); // Create a new user in the database using User model and data from the request body
    req.session.save(() => {
      // Save the user's information in the session
      req.session.user_id = newUserData.id;
      req.session.username = newUserData.username;
      req.session.logged_in = true;
      res.status(200).json(newUserData); // Response with a success status and the newly created user data
    });
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(400).json(err);
  }
});

// Route to handle login user at "/login" endpoint (POST request)
// http://localhost:3001/api/user/login
router.post("/login", async (req, res) => {
  try {
    // Find user by email from the request body
    const newUserData = await User.findOne({
      // req.body.email is accessing the parsed JSON data from the request body
      // This is possible because of the 'express.json()' middleware already processed the JSON data and populated the 'req.body' with the parsed JSON object
      where: { email: req.body.email },
    });

    if (newUserData) {
      // Validate the user's password
      const validPassword = await newUserData?.checkPassword(req.body.password);

      if (validPassword) {
        req.session.save(() => {
          req.session.user_id = newUserData.id;
          req.session.username = newUserData.username;
          req.session.logged_in = true;
          res.status(200).json(newUserData);
        });
      } else {
        res.status(400).json({ message: "Invalid password." });
      }
    } else {
      res.status(400).json({ message: "User not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." }); // Corrected syntax here
  }
});

// Note Above: Putting it all together, this code is getting a POST request from the loginFormHandler, which is client-side JavaScript that handles form submissions for user login

// The server-side code handling the "/api/user/login" endpoint should be designed to parse the JSON data from the request body.
// The server-side code, using the Express framework, implicitly handles parsing JSON data from the request body. Specifically, `express.json()`  middleware, which is built into Express.

// Route to handle logging out user at "/logout" endpoint (DELETE request)
// Could have (routers.get) GET, but DELETE makes more sense
// http://localhost:3001/api/user/logout
// Listen for HTTP DELETE request
router.delete("/logout", (req, res) => {
  // Method used to destroy current session
  req.session.destroy(() => {
    // After destroying the session, respond with No Content (204) and end() without sending any data back
    res.status(204).end();
  });
});

// Route to handle updating a password at "/update/pass" endpoint (PUT request)
// withAuth middleware is used to ensure authentication
router.put("/update/pass", withAuth, (req, res) => {
  // Update data or perform actions that require authentication
  try {
    // User.update() used to update the user's password in the database with 2 arguments
    // const [rowsChanged] destructed the result of the update indicating how many rows were affected in the database
    const [rowsChanged] = User.update(
      // First argument - an object with the new password
      { password: req.body.password },
      // Second argument - object with a where clause specifying which user to update based on user's session ID
      {
        where: {
          id: req.session.user_id,
        },
      }
    );

    res.json(
      // if rowsChanged is greater than 0, respond with a JSON message indicating the number of rows changed
      rowsChanged > 0
        ? res.json({ message: rowsChanged + " rows changed" })
        : // if no rows were changed, respond with a 404 status to indicate user was not found
          res.status(404).end()
    );
    // Handle error
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
