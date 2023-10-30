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
  for (const singlepost of postData) {
    // loops over the postData array

    // Create a post
    await Post.create({
      // creates Post instances
      ...singlepost, // spread the properties of each post and ...
      user_id: users[Math.floor(Math.random() * users.length)].id, // assigns a random user_id from the previously created users
    });

    for (const comment of commentData) {
      await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        post_id: post.id,
      });
    }
  }
  process.exit(0); // exits the Node.js process, terminating the script
};

seedDatabase();
