require("dotenv").config();
const jwt = require("jwt-simple");
const User = require("../models/user");
const config = process.env.SECRET; //require("../config");
const { v4: uuidv4 } = require("uuid");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub: 'subject', iat: 'issued at time'
  return jwt.encode({ sub: user.id, iat: timestamp }, config);
}

exports.signin = function (req, res, next) {
  // User.findOne({ username: username });
  // User has already had username and password auth'd, they just need a token
  res.send({ token: tokenForUser(req.user), userId: req.user.userId });
};

exports.signup = function (req, res, next) {
  const username = req.body.username;
  const userId = uuidv4(); // ******************
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(422)
      .send({ error: "You must provide username and password." });
  }

  // See if user with given username exists
  User.findOne({ username: username }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // If a user with given username exists, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Username is in use." });
    }

    // Else, create and save user record
    const user = new User({
      username: username,
      userId: userId, // ******************
      password: password,
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      // Respond to request indicating the user was created
      // This object is response.data in the signup action
      res.json({ token: tokenForUser(user), userId: userId });
    });
  });
};
