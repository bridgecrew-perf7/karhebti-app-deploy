const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
var msgData = Message.find({});

router.post("/", function (req, res, next) {
  var msgDetails = new Message({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  });

  msgDetails.save(function (err, doc) {
    if (err) throw err;

    msgData.exec(function (err, data) {
      if (err) throw err;

      res.redirect("/welcome");
    });
  });
});
router.get("/", function (req, res, next) {
  res.render("contact.ejs");
});
module.exports = router;