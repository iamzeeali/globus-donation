const mongoose = require("mongoose");

const whatsgroup = new mongoose.Schema({
  handle: {
    type: String,
    required: true,
  },
  groupLink: {
    type: String,
    required: [true, "There must be a Link"],
  },
  desc: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Whatsgroup = mongoose.model("Whatsgroup", whatsgroup);
