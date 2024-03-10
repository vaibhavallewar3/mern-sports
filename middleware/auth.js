const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorHandler = require("../utils/errHandle");


exports.isAuthenticatedUser = async (req, resp, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler('Please Login Firstly!', 403));
    };

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id);
    next();
};

exports.isAutherizedRole = (...roles) => {
    return (req, resp, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role :${req.user.role} is not Allowed to Access this Resource.`, 403));
        };
        next();
    };
};