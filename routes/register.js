var express = require("express");
var multer = require("multer");
var path = require("path");

var uploadModel = require("../models/upload");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

var router = express.Router();
var imageData = uploadModel.find({});

var Storage = multer.diskStorage({
  destination: "./Project/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: Storage,
}).single("file");

router.post("/", upload, function (req, res, next) {
  var imageFile = req.file.filename;
  var success = req.file.filename + " uploaded successfully";

  var imageDetails = new uploadModel({
    imagename: imageFile,
    vname: req.body.vname,
    vmodel: req.body.vmodel,
    engine: req.body.engine,
    trans: req.body.trans,
    color: req.body.color,
    pyear: req.body.pyear,
    price: req.body.price,
    phoneno: req.body.phoneno,
    address: req.body.address,
  });
  imageDetails.save(function (err, doc) {
    if (err) throw err;

    imageData.exec(function (err, data) {
      if (err) throw err;

      res.redirect("/dashboard2");
    });
  });
});

router.get("/", ensureAuthenticated, function (req, res, next) {
  res.render("regcar.ejs");
});

module.exports = router;
