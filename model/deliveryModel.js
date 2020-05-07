const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  organisation: {
    type: mongoose.Schema.ObjectId,
    ref: "Organisation",
  },
  handle: {
    type: String,
    required: true,
  },
  cause: {
    type: mongoose.Schema.ObjectId,
    ref: "Cause",
  },
  kitType: {
    type: String,
    required: [true, "kit type missing"],
  },
  kitQuantity: {
    type: Number,
    required: [true, "kit quantity missing"],
  },
  state: {
    type: String,
    required: [true, "state missing"],
  },
  city: {
    type: String,
    required: [true, "city missing"],
  },
  area: {
    type: String,
    required: [true, "area missing"],
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
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  date: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

deliverySchema.index({ "$**": "text" });

deliverySchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  })
    .populate({
      path: "organisation",
    })
    .populate({
      path: "cause",
    });

  next();
});

deliverySchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = Ration = mongoose.model("Ration", deliverySchema);
