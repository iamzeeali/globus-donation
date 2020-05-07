const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: [true, "There must be a ration Name"],
  },
  accountNo: {
    type: Number,
    required: [true, "There must be a ration Name"],
    unique: true,
  },

  ifsc: {
    type: String,
    required: [true, "There must be a ration Name"],
  },

  bankName: {
    type: String,
    required: [true, "ration must have a end Date."],
  },
  bankBranch: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ration = mongoose.model("account", AccountSchema);
