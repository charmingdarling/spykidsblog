const sequelize = require("../config/databaseConnection"); // Import sequelize instance for database connection
const { User, Post, Comment } = require("../models"); // Imports Sequelize models

// Data files. Import JSON data from external files.
const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");
const { post } = require("../controllers/homeRoutes");

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); // Asynchronously syncs defined models with the database, drops exiting tables and recreates them

  // Create users
  const users = await User.bulkCreate(userData, {
    // bulkCreate() inserts user data into the User model
    individualHooks: true, // option triggers any 'beforeCreate' or 'afterCreate' defined in the model
    returning: true, // ensures that the method returns the created user instances
  });

  // Create posts and comments
  // loops over the postData array
  for (const singlepost of postData) {
    // ----------------------------------------------------------------------------------------- //
    // Store the user we find a specific post, based off the user_id from singlepost (post data)
    // users.find = Line 14
    // (user) = a parameter from the entirety of the User model is represented in (user)
    // => - stating that this is a boolean: YES, found user.id === singlepost.user_id or NO we did not find it
    // user_id = take only the id from User model, see if matches user_id of singlepost of postData
    // ----------------------------------------------------------------------------------------- //
    const postCreator = users.find((user) => user.id === singlepost.user_id);

    // Only create a post IF the matching user is found
    if (postCreator) {
      // Create a post
      const createdPost = await Post.create({
        // creates Post instances
        ...singlepost, // spread the properties of each post and ...
        user_id: postCreator.id, // assigning the correct users id to each post
      });

      for (const comment of commentData) {
        if (comment.post_id === createdPost.id) {
          await Comment.create({
            ...comment,
          });
        }
      }
    }
  }
  process.exit(0); // exits the Node.js process, terminating the script
};

seedDatabase();
