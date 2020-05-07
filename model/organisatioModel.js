const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema({
  orgName: {
    type: String,
    required: [true, "organisation name missing"],
  },
  handle: {
    type: String,
    required: [true, "organisation handle missing"],
    unique: true,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  phone: {
    type: String,
  },
  logo: {
    type: String,
  },
  dashMsg: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

organisationSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = Organisation = mongoose.model(
  "Organisation",
  organisationSchema
);
