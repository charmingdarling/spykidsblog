const User = require("./User");
// const Post = require("./Post");
// const Comment = require(".Comment");

// // In Post.js
// Post.hasMany(Comment, {
//   foreignKey: "post_id",
//   onDelete: "CASCADE",
// });

// Post.belongsTo(User, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

// // In Comment.js

// Comment.belongsTo(Post, {
//   foreignKey: "post_id",
// });

// Comment.belongsTo(User, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

// // In User.js

// User.hasMany(Post, {
//   foreignKey: "user_id",
// });

// User.hasMany(Comment, {
//   foreignKey: "user_id",
// });

module.exports = { User };
