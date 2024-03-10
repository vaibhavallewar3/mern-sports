
const sendToken = (user, statusCode, resp) => {
    const token = user.getJWToken();

    resp.cookie('token', token, { expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000), httpOnly: true })
        .json({ success: true, token }).status(statusCode);
};

module.exports = sendToken;