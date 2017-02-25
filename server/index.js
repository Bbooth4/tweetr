"use strict";

const PORT            = 8080;
const express         = require("express");
const bodyParser      = require("body-parser");
const sassMiddleware  = require('node-sass-middleware');
const cookieSession   = require('cookie-session');  
const morgan          = require("morgan");
const app             = express();

app.use(sassMiddleware({
    /* Options */
    src: 'public/styles/sass',
    dest: 'public/styles',
    debug: false,
    outputStyle: 'compressed',
    prefix:  '/styles' 
}));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const MongoClient   = require("mongodb").MongoClient;
const MONGODB_URI   = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  const Users = require("./lib/users.js")(db);
  app.use("/tweets", tweetsRoutes); 
  app.use("/register", tweetsRoutes);
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
