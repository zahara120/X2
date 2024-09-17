const jwt = require("jsonwebtoken");

const signtoken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

const verifytoken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { signtoken, verifytoken }