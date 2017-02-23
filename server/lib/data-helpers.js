"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db` 
    saveTweet: function(newTweet, callback) {
      // simulateDelay(() => {
      db.collection('tweets').insertOne(tweet, (err, tweets) => {
        if (err) {
          console.log('Failed to retreive tweets.');
          return callback('Failed to retreive tweets.');
          // db.tweets.push(newTweet);
        } else {
          callback(null, true);
        }
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      // simulateDelay(() => {
        db.collection("tweets").find().toArray((err, tweets) => {
          if (err) {
            console.log('Failed to retreive tweets.');
            return callback(err);
          } else {
          // callback(null, tweets);
            // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
            callback(null, tweets);
          }
        });
    }
  }
  // return {
  //   saveTweet: saveTweet, 
  //   getTweets: getTweets
  // }
}
