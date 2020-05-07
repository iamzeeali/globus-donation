const mongoose = require("mongoose");

const kitTypeSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true,
  },
  kitType: {
    type: String,
    required: [true, "There must be a grocery Name"],
  },
  price: {
    type: Number,
    required: [true, "There must be a price Name"],
  },
  items: [String],
  active: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = KitType = mongoose.model("KitType", kitTypeSchema);
