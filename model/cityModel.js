const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  state: {
    type: String,
    required: [true, "State missing"],
  },
  city: {
    type: String,
    required: [true, "Please enter city name"],
  },
  areas: [String],
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

citySchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = City = mongoose.model("City", citySchema);
