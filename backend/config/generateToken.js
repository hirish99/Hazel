const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: "30y",
    });
};

module.exports = generateToken;