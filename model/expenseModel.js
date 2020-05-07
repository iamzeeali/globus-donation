const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
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
  expensor: {
    type: String,
  },
  amount: {
    type: Number,
    required: [true, "Must be Investing Amount"],
  },

  date: {
    type: Date,
    required: [true, "Expense must have a Date."],
  },

  image: {
    type: String,
  },
  //imageId: String,

  purpose: {
    type: String,
    // required: [true, "Must be Currency Type"]
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

expenseSchema.pre(/^find/, function (next) {
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

module.exports = Expense = mongoose.model("Expense", expenseSchema);
