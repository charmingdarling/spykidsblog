// Import modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

// Create Post class that extends Sequelize model
class Post extends Model {}

// Initialize Post model
Post.init(
  {
    // Define attributes
    id: {
      type: DataTypes.INTEGER, // Data Type specifies a whole number value
      allowNull: false, // Allow an empty value? No.
      primaryKey: true, // Define if primary key. Yes. Unique clue that establishes relationships between tables.
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        // referencing so each post is associated with a specific user
        model: "User", // foreign key pointing to primary key of user model
        key: "id", // referencing the id as the primary key
      },
    },
    title: {
      type: DataTypes.STRING, // Data Type specifies short text or character data
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT, // Data Type specifies long text data like paragraphs or entire documents
      allowNull: false,
      validate: {
        notEmpty: true, // Ensure that the content is not empty
      },
    },
    date_created: {
      type: DataTypes.DATE, // Define a column in the model that should store date and time values, time stamps, representing a specific point in time
      allowNull: false,
      defaultValue: DataTypes.NOW, // Set default to current date and time when a new record is created
    },
  },
  {
    sequelize, // Sequelize instance is being used
    timestamps: true, // Controls if Sequelize should create `createdAt` and updatedAt` timestamp fields in model
    freezeTableName: true, // True - prevents Sequelize from pluralizing the table name based on the model name
    underscored: true, // Uses snake_case for automatically generated database column names. createdAt will be created_at
    modelName: "Post", // Explicitly set the name of the model.  Useful if you want the model name to be different from table name
  }
);

module.exports = Post;
