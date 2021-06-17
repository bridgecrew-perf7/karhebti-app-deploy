const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../models/User");
const Admin = require("../models/Admin");

function SessionConstructor(userId, userGroup, details) {
  this.userId = userId;
  this.userGroup = userGroup;
  this.details = details;
}

module.exports = function (passport) {
  passport.serializeUser(function (userObject, done) {
    let userGroup = "User";
    let userPrototype = Object.getPrototypeOf(userObject);
    if (userPrototype === User.prototype) {
      userGroup = "User";
    } else if (userPrototype === Admin.prototype) {
      userGroup = "Admin";
    }
    let sessionConstructor = new SessionConstructor(
      userObject.id,
      userGroup,
      ""
    );
    done(null, sessionConstructor);
  });
  passport.deserializeUser(function (sessionConstructor, done) {
    if (sessionConstructor.userGroup == "User") {
      User.findById({
          _id: sessionConstructor.userId,
        },
        "-localStrategy.password",
        function (err, user) {
          done(err, user);
        }
      );
    } else if (sessionConstructor.userGroup == "Admin") {
      Admin.findById({
          _id: sessionConstructor.userId,
        },
        "-localStrategy.password",
        function (err, user) {
          done(err, user);
        }
      );
    }
  });

  passport.use(
    "User",
    new LocalStrategy({
      usernameField: "email"
    }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email,
      }).then((user) => {
        if (!user) {
          return done(null, false, {
            message: "That email is not registered"
          });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Password incorrect"
            });
          }
        });
      });
    })
  );

  passport.use(
    "Admin",
    new LocalStrategy({
      usernameField: "email"
    }, (email, password, done) => {
      // Match Admin
      Admin.findOne({
        email: email,
      }).then((Admin) => {
        if (!Admin) {
          return done(null, false, {
            message: "That email is not registered"
          });
        }

        // Match password
        bcrypt.compare(password, Admin.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, Admin);
          } else {
            return done(null, false, {
              message: "Password incorrect"
            });
          }
        });
      });
    })
  );
};