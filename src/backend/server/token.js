const jwt = require('jsonwebtoken');

function jwtTokenCreate(user){
    const ONE_WEEK = 60 * 60 * 24 * 7;

    return jwt.sign(user, 'secretKey', {
        expiresIn: ONE_WEEK
    });
}

module.exports = {
    jwtTokenCreate
}