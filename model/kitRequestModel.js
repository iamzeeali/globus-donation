const mongoose = require("mongoose");
const validator = require("validator");

const kitRequestSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  handle: {
    type: String,
  },
  state: {
    type: String,
    required: [true, "state missing"],
  },
  stateName: {
    type: String,
  },
  city: {
    type: String,
    required: [true, "city missing"],
  },
  area: {
    type: String,
    required: [true, "area missing"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  road: {
    type: String,
  },
  landmark: {
    type: String,
  },
  houseNo: {
    type: String,
  },
  kitQuantity: {
    type: Number,
  },
  phone: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

kitRequestSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = KitReq = mongoose.model("KitReq", kitRequestSchema);
