const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReserveSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  vid: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "uploadimages",
  }, ],

});

const Reserve = mongoose.model("reservedcars", ReserveSchema);

module.exports = Reserve;