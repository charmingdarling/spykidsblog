// import sequelize library, which is an ORM library for node designed to work with relational databases
// when you have imported sequelize, you can use it to define models, interact with databases, perform CRUD operations, etc
const Sequelize = require("sequelize");

// loads all env variables into the process and places it in the process.env
require("dotenv").config();

// // creating a Sequelize instance and define a database connection
// const sequelize = new Sequelize(
//   process.env.DB_NAME, // database name
//   process.env.DB_USER, // user
//   process.env.DB_PASSWORD, // password

//   // database location
//   {
//     host: "localhost",
//     dialect: "mysql",
//     port: 3306,
//   }
// );

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
