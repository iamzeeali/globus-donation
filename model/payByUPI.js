const mongoose = require("mongoose");

const UPISchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true,
  },
  UPIName: {
    type: String,
  },

  UPIid: {
    type: String,
  },
  phoneNo: {
    type: Number,
    required: [true, "There must be a ration Name"],
  },
  image: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ration = mongoose.model("upi", UPISchema);
