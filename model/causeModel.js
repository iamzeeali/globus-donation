const mongoose = require("mongoose");
const causeSchema = new mongoose.Schema({
  organisation: {
    type: String,
    ref: "Organisation",
  },
  cause: {
    type: String,
    required: [true, "There must be a cause"],
  },
  handle: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

causeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "organisation",
  });
  next();
});

causeSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = Cause = mongoose.model("Cause", causeSchema);
