const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegisterSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  vid: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "uploadimages",
  }, ],

});

const Registeredcar = mongoose.model("registeredcars", RegisterSchema);

module.exports = Registeredcar;