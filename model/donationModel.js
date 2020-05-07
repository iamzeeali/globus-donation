const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  handle: {
    type: String,
    required: true,
  },
  organisation: {
    type: mongoose.Schema.ObjectId,
    ref: "Organisation",
  },
  cause: {
    type: mongoose.Schema.ObjectId,
    ref: "Cause",
  },
  username: { type: String },
  investor: {
    type: String,
  },
  amount: {
    type: Number,
    required: [true, "Must be Investing Amount"],
  },
  date: {
    type: Date,
    required: [true, "Investment must have a Date."],
  },
  image: {
    type: String,
  },
  // imageId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

donationSchema.pre(/^find/, function (next) {
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

module.exports = Donation = mongoose.model("Donation", donationSchema);
