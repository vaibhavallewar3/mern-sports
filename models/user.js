const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name Cannot be Exceed 30 Chars!"],
        minLength: [5, "Name Should have More than 5 Chars!"]
    },
    mobile: {
        type: String,
        required: [true, "Please Enter Your Mobile!"],
        maxLength: [10, "Name Cannot be Exceed 10 Chars!"],
        minLength: [10, "Name Should have 10 Chars!"],
        validate: [validator.isMobilePhone, "Please Enter Valid Mobile Number!"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email!"],
        unique: true,
        validate: [validator.isEmail, "Please Enter Valid Email!"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password!"],
        minLength: [8, "Password Should have More than 8 Chars!"],
        select: false
    },
    address: {
        street: { type: String },
        city: { type: String },
        pinCode: { type: Number }
    },
    location: {
        lat: { type: Number },
        lng: { type: Number }
    },
    skills: [{
        type: String
    }],
    team: {
        type: mongoose.Schema.ObjectId,
        ref: "teams"
    },
    role: {
        type: String,
        default: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Save Password Crypted
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    };
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare Pass
userSchema.methods.comparePass = async function (enterPass) {
    return await bcrypt.compare(enterPass, this.password);
};

// JWT Token
userSchema.methods.getJWToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

module.exports = mongoose.model("users", userSchema);