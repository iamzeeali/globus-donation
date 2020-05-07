const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true,
  },
  default_grocery: {
    type: mongoose.Schema.ObjectId,
    ref: "Grocery",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

settingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "default_grocery",
    select: "kitType  price",
  });
  next();
});

module.exports = Setting = mongoose.model("Setting", settingSchema);
