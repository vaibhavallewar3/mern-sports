const ErrorHandler = require("../utils/errHandle");

module.exports = (err, req, resp, next) => {
    err.statusCode = 500 || err.statusCode;
    err.message = err.message || "Internal Server Error";

    //wrong MongoDb Id Error
    if (err.name == "CastError") {
        const message = `Resource Not Found! Invalid : ${err.path}`;
        err = new ErrorHandler(message, 400);
    };

    // Mongoose Duplicate Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered!`;
        err = new ErrorHandler(message, 400);
    };

    // json web token error
    if (err.name == "JsonWebTokenError") {
        const message = `JSON Web Token is Invalid!, try again...`;
        err = new ErrorHandler(message, 400);
    };

    // json web token expire error
    if (err.name == "TokenExpiredError") {
        const message = `JSON Web Token is Expired!, try again...`;
        err = new ErrorHandler(message, 400);
    };

    resp.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};