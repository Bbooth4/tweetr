"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const userRoutes  = express.Router();

module.exports = function makeDataHelpers(db) {
  return {

      registerUser: function(user, callback) {
        db.collection("tweets").insertOne(user, (err, result) => {
            if (err) {
              console.log('Failed to add user.');
              return callback(err);
            }
            callback(null, true); 
        });
      }
  }
}

userRoutes.post("/", (req, res) => {
  console.log('it got to register')
  let email = req.session.email;
  let password = req.body.password;
  if (req.body.password === "") {
    res.status(403).send("You failed to provide an adequate password with at least one character.");
  } else {
    DataHelpers.registerUser(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        req.session.email = email;
        res.status(201).send();
      }
    });
  }
});
