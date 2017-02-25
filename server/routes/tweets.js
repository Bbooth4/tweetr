"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });
  
  return tweetsRoutes;

}








// maybe be used if I get register to function 

// index.get("/login", (req, res) => {
//   let userId = req.session.email;
//   let templateVars = {
//     email: userId
//   };
//   res.status(200).render("tweetr_login", templateVars);
// });

// app.post("/logout", (req, res) => {
//   req.session = null;
//   res.status(200).redirect("/login");
// })

// app.post("/register", (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   let saltRounds = 10;
//   let hashedPassword = bcrypt.hashSync(password, saltRounds);
//   if (req.body.password === "") {
//     res.status(403).send("You failed to provide an adequate password with at least one character.");
//   } else if (!user[req.body.email]) {
//     req.session.email = email;
//     user[req.body.email] = {
//       id: randomURLString,
//       email: req.body.email,
//       password: hashedPassword,
//       urlDatabase: {}
//       }
//     res.status(200).redirect(`/`);
//   } else {
//     res.status(403).send("That user already exists!");
//   }
// });

// app.post("/login", (req, res) => {
//   const email = req.body.email;
//   if (user[email] && bcrypt.compareSync(req.body.password, user[email].password)) {
//     req.session.email = email;
//     res.status(200).redirect(`/`);
//   } else {
//     res.status(403).send("Incorrect login credentials!");
//   }
// });