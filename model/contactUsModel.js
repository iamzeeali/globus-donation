const mongoose = require("mongoose");
const validator = require("validator");

const contactUsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide your email"],
    },
    ngo: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
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
    road: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    landmark: {
        type: String,
    },
    houseNo: {
        type: String,
    },
    phone: {
        type: Number,
    },
    website: {
        type: String,
    },



});

module.exports = ContactUs = mongoose.model(
    "ContactUs",
    contactUsSchema
);

//state, city,address,website,phone,email
//