const mongoose = require("mongoose");

var uploadSchema = new mongoose.Schema({
  isfree: {
    type: Boolean,
    default: true,
  },
  vname: {
    type: String,
    required: true,
  },
  vmodel: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  pyear: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  trans: {
    type: String,
    required: true,
  },
  engine: {
    type: String,
  },
  imagename: {
    type: String,
    required: true,
  },
  fullprice: {
    type: String,
  },
  dateIn: {
    type: Date,
  },

  dateOut: {
    type: Date,
  },
  currdate: {
    type: Date,
    default: Date.now,
  },
});

var uploadModel = mongoose.model("uploadimages", uploadSchema);

module.exports = uploadModel;