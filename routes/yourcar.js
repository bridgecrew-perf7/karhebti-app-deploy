var express = require("express");
var path = require("path");

var RegisterModel = require("../models/Yourcar");
var uploadModel = require("../models/upload");

var data = RegisterModel.find({});
var router = express.Router();

router.get("/", async (req, res) => {
  const user = await RegisterModel.findOne({
    userid: req.user._id
  });
  if (user) {
    const records1 = await RegisterModel.findOne({
      userid: req.user._id,
    }).populate("vid");

    if (records1) {
      res.render("yourcar", {
        records1: records1.vid.length > 0 ? records1.vid : null,
      });
      return;
    }
  }

  res.render("yourcar", {
    records1: null
  });
});
router.post("/:id", async function (req, res) {
  try {
    var details = await uploadModel.findByIdAndUpdate(req.params.id);
    if (details) {
      details.isfree = true;
      details.save();
    }
  } catch (error) {
    console.log(error);
  }
  try {
    var details = await RegisterModel.findOne({
      userid: req.user._id
    });
    if (!details) {
      details = new RegisterModel({
        userid: req.user._id,
        vid: [req.params.id],
      });
      await details.save();
      res.redirect("/yourcar");
      return;
    }
    var {
      _id,
      vid
    } = details;
    vid = [...details.vid, req.params.id];

    if (_id) {
      var car = await RegisterModel.findByIdAndUpdate(_id, {
        vid
      });
    }
  } catch (error) {
    console.log(error);
  }

  res.redirect("/yourcar");
});

// DELETE car route
router.post("/deletepath/:carid", async (req, res) => {
  try {
    var details = await RegisterModel.findOne({
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
          details1.isfree = false;
          details1.save();
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect("/yourcar");
});

module.exports = router;