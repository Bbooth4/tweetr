"use strict";

const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
          if (err) {
            console.log('Failed to retreive tweets.');
            return callback(err);
          } else {
            callback(null, tweets);
          }
        });
      },
      
      saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet, (err, result) => {
         if (err) {
           console.log('Failed to load tweets.');
           return callback(err);
         } 
         callback(null, true);
        });
      }
  }
}
