const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter Event Name!"],
    },
    description: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    address: {
        street: { type: String },
        city: { type: String },
        pinCode: { type: Number }
    },
    // location:{},
    type: {
        type: String
    },
    price: {
        first: {
            type: Number
        },
        second: {
            type: Number
        },
        third: {
            type: Number
        }
    },
    organiser: {
        type: mongoose.Schema.ObjectId,
        ref: "teams"
    },
    created_by: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("events", eventSchema);