const bcrypt = require("bcrypt");

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword }