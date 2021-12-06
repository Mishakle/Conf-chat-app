const jwt = require('jsonwebtoken');

const options = {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.ACCESS_EXPRIRES_IN,
};

exports.jwtCreator = (body) => {
    return jwt.sign({ user: body }, process.env.ACCESS_TOKEN_SECRET, options);
};
