const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load Admin model
const Admin = require("../models/Admin");
const { forwardAdminAuthenticated } = require("../config/adminauth");

// Admin Login Page
router.get("/adminlog", forwardAdminAuthenticated, (req, res) =>
  res.render("adminlog")
);

// Admin Register Page
router.get("/adminreg", forwardAdminAuthenticated, (req, res) =>
  res.render("adminreg")
);

// Admin Register
router.post("/adminreg", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: "Please enter all fields",
    });
  }

  if (password != password2) {
    errors.push({
      msg: "Passwords do not match",
    });
  }

  if (password.length < 6) {
    errors.push({
      msg: "Password must be at least 6 characters",
    });
  }

  if (errors.length > 0) {
    res.render("adminreg", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    Admin.findOne({
      email: email,
    }).then((admin) => {
      if (admin) {
        errors.push({
          msg: "Email already exists",
        });
        res.render("adminreg", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newAdmin = new Admin({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin
              .save()
              .then((admin) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/admins/adminlog");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Admin Login
router.post("/adminlog", (req, res, next) => {
  passport.authenticate("Admin", {
    successRedirect: "/dashboard2",
    failureRedirect: "/admins/adminlog",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/admins/adminlog");
});

module.exports = router;
