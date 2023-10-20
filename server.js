// imports built-in `path` module, which provides utilities for working with the file and directory paths
const path = require("path");

// import express dependency
const express = require("express");

// import express-session
const session = require("express-session");

// creating an instance of an express handlebars engine
const hbs = exphbs.create({ helpers });

// import express handlebars (this is a Node.js module)
const exphbs = require("express-handlebars");

// import sequelize connection, modularizing routes that were separated into different files for better organization and maintainabilitiy; library for referring to the database
const sequelize = require("./config/databaseConnection");

// Import controllers
const routes = require("./controllers");

// import helpers
const helpers = require("./utils/helpers");

// connects sequelize to sessions
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// set up the express app
const app = express();

// specify the port express will run on
const PORT = process.env.PORT || 3001;

// Session creation
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// set handlebars as the default template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sess));

// middleware function that serves static files and joins the segments together
app.use(express.static(path.join(__dirname, "public")));

// This middleware parses incoming JSON requests and populates the `req.body` object
app.use(express.json());

// This middleware parses incoming URL-encoded form data and populates the `req.body` object.
// representing special characters in a URL by replacing them with a % followed by two hexadecimal digits

app.use(express.urlencoded({ extended: false }));

// This middleware uses the routes defined in the 'routes' router for specific paths.
app.use(routes);

// sync models to the database, then turn on server
// force determines whether to drop existing tables and re-create them when syncing the sequelize modules with the database (false no dropping database)
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on: http://localhost:${PORT}`)
  );
});
