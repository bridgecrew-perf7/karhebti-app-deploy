var express = require("express");
var path = require("path");
var router = express.Router();
var ReserveModel = require("../models/ReservedCar");
var uploadModel = require("../models/upload");
const {
  ensureAuthenticated,
  forwardAuthenticated
} = require("../config/auth");

router.get("/", ensureAuthenticated, async (req, res) => {
  const user = await ReserveModel.findOne({
    userid: req.user._id
  });
  if (user) {
    const records1 = await ReserveModel.findOne({
      userid: req.user._id,
    }).populate("vid");

    if (records1) {
      res.render("reserve", {
        records1: records1.vid.length > 0 ? records1.vid : null,
      });
      return;
    }
  }

  res.render("reserve", {
    records1: null
  });
});
router.post("/:id", async function (req, res) {
  try {
    var details = await uploadModel.findByIdAndUpdate(req.params.id);
    if (details) {
      details.isfree = false;
      details.fullprice = req.body.numbers;
      details.dateIn = req.body.dateIn;
      details.dateOut = req.body.dateOut;
      details.save();
    }
  } catch (error) {
    console.log(error);
  }

  try {
    var details = await ReserveModel.findOne({
      userid: req.user._id
    });
    if (!details) {
      details = new ReserveModel({
        userid: req.user._id,
        userName: req.user.name,
        vid: [req.params.id],
      });
      await details.save();
      res.redirect("/reserve");
      return;
    }
    var {
      _id,
      vid,
      userName
    } = details;
    vid = [...details.vid, req.params.id];

    if (_id) {
      var car = await ReserveModel.findByIdAndUpdate(_id, {
        vid
      }, userName);
    }
  } catch (error) {
    console.log(error);
  }

  res.redirect("/reserve");
});

// DELETE car route
router.post("/deletepath/:carid", async (req, res) => {
  try {
    var details = await ReserveModel.findOne({
      userid: req.user._id
    });

    if (!details) {
      res.redirect("/dashboard");
      return;
    } else {
      details.vid.pull(req.params.carid);
      await details.save();

      try {
        var details1 = await uploadModel.findByIdAndUpdate(req.params.carid);
        if (details1) {
          details1.isfree = true;
          details1.save();
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect("/reserve");
});

// DELETE car route for Admin
router.post("/deletepath1/:carid", async (req, res) => {
  try {
    var details1 = await uploadModel.findByIdAndUpdate(req.params.carid);
    if (details1) {
      details1.isfree = false;
      details1.save();
    }
  } catch (error) {
    console.log(error);
  }

  res.redirect("/dashboard2");
});
module.exports = router;