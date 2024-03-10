const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter Your Team Name"],
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    address: {
        street: { type: String },
        city: { type: String },
        pinCode: { type: Number }
    },
    // location:{},
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("teams", teamSchema);