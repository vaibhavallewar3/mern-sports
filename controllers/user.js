const User = require("../models/user");
const ErrorHandler = require("../utils/errHandle");
const sendToken = require("../utils/token");


exports.registerUser = async (req, resp, next) => {
    try {
        const { name, email, password, mobile, skills, address: { street, city, pinCode } } = req.body;

        const user = await User.create({ name, email, mobile, password, skills, address: { street, city, pinCode } });
        resp.status(201).json({ success: true, message: `${user.name} is Registered Successfully...` });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};

exports.loginUser = async (req, resp, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email or Password!", 401));
        };

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler(`Please Enter Valid Mail ID & Password!`, 401));
        };

        const isPassMatch = user.comparePass(password);
        if (!isPassMatch) {
            return next(new ErrorHandler(`Please Enter Valid Mail ID & Password!`, 401));
        };

        sendToken(user, 200, resp);
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};

exports.logoutUser = (req, resp, next) => {
    try {
        resp.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true })
            .status(200).json({ success: true, message: "Logged Out Successfully..." });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};

exports.myProfile = async (req, resp, next) => {
    try {
        const user = await User.findById(req.user.id).populate("team");

        resp.status(200).json({ success: true, user });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};

exports.updateMyProfile = async (req, resp, next) => {
    try {
        let user = await User.findById(req.user.id);
        const { name, email, mobile, location } = req.body;

        await user.updateOne({ name, email, mobile, location }, { new: true, runValidators: true, useFindAndModify: false });
        resp.status(200).json({ success: true, message: "Profile Updated Successfully..." });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};

exports.updateUserRole = async (req, resp, next) => {
    try {
        const { role } = req.body;
        let user = await User.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler(`User Not Found!`, 404));
        };

        await user.updateOne({ role }, { new: true, runValidators: true, useFindAndModify: false });
        resp.status(200).json({ success: true, message: `User Role Updated Successfully...` });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};