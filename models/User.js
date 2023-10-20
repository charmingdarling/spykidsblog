const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/databaseConnection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserDataforPasswordFromUserInitStoredHere) => {
        newUserDataforPasswordFromUserInitStoredHere.password =
          await bcrypt.hash(
            newUserDataforPasswordFromUserInitStoredHere.password,
            10
          );
        return newUserDataforPasswordFromUserInitStoredHere;
      },
      beforeUpdate: async (updatedUserPassword) => {
        updatedUserPassword.password = await bcrypt.hash(
          updatedUserPassword.password,
          10
        );
        return updatedUserPassword;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "User",
  }
);
