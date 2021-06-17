const express = require("express");
const router = express.Router();
var data = require("../models/upload");

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const {
  ensureAdminAuthenticated,
  forwardAdminAuthenticated,
} = require("../config/adminauth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  var records = await data.find();
  res.render("dashboard", {
    user: req.user,
    records: records,
  });
});

// Admin Dashboard
router.get("/dashboard2", ensureAdminAuthenticated, async (req, res) => {
  var records = await data.find();
  res.render("dashboard2", {
    user: req.user,
    records: records,
  });
});

// Profile Page
router.get("/profile", ensureAuthenticated, (req, res) => {
  res.render("profile", {
    user: req.user,
    email: req.email,
  });
});

// Search Car
router.get("/find", ensureAuthenticated, async (req, res) => {
  try {
    var records = await data.find(
      {
        $or: [
          { vname: { $regex: req.query.vname, $options: "i" } },
          { vmodel: { $regex: req.query.vname, $options: "i" } },
        ],
      },
      (err, records) => {
        if (err) {
          console.log(err);
        } else {
          res.render("find", { records: records });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
