// Import modules
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/databaseConnection");

// Create User clsas that extends Sequelize model
class User extends Model {
  // Method that checks if the given password pairs with the stored hash password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize User model
User.init(
  {
    // Attributes are defined
    id: {
      // Type of attribute
      type: DataTypes.INTEGER, // Data Type specifies a whole number value
      allowNull: false, // Allow an empty value? No.
      primaryKey: true, // Define if it is a primary key. Yes. Unique clue that establishes relationships between tables.
      autoIncrement: true, // Automatically generates unique values and records it
    },
    username: {
      type: DataTypes.STRING, // Data Type specifies text or character data
      allowNull: false,
      unique: true, // Saying that this column must be unique, no two rows in the table can have the same value for this attribute
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // Defines validation constraints for a model attribute
        isEmail: true, // Here, we want to make sure that they provide a valid email address
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Check the length of a string
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserDataforPasswordFromUserInitStoredHere) => {
        // hook trigger newUser...
        // hooks are used to perform certain actions automatically before a new record is created
        newUserDataforPasswordFromUserInitStoredHere.password =
          await bcrypt.hash(
            // hash password with a salt factor of 10
            newUserDataforPasswordFromUserInitStoredHere.password, // hashed password is stored back in the password field of the same object
            10
          );
        return newUserDataforPasswordFromUserInitStoredHere; // returns modified object
      },
      beforeUpdate: async (updatedUserPassword) => {
        // hooks are used to perform certain actions automatically before  an existing record is updated
        updatedUserPassword.password = await bcrypt.hash(
          updatedUserPassword.password,
          10
        );
        return updatedUserPassword;
      },
    },
    sequelize, // Sequelize instance is being u sed
    timestamps: false, // controls if Sequelize should create `createdAt` and updatedAt` timestamp fields in model
    freezeTableName: true, // True - prevents Sequelize from pluralizing the table name based on the model name
    underscored: true, // Uses snake_case for automatically generated database column names. createdAt will be created_at
    modelName: "User", // Explicitly set the name of the model.  Useful if you want the model name to be different from table name
  }
);

module.exports = User; // Exporting User Model to be available to other parts of the application
