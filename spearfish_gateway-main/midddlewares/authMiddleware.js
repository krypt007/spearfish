'use strict'

const jwt = require("jsonwebtoken");

const getAuthDataFromToken = (bearerHeader) => {
    const data = {
        isLoggedIn: false,
        user: null,
    };

    if (bearerHeader !== undefined) {
        const token = bearerHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
            if (!err) {
                const { user } = payload;
                data.user = user;
                data.isLoggedIn = true;
            }
        });
    }
    return data;
}

/**
 * @method authMiddleware
 * @description middleware to check for validating user login, through jwt
 * @param req express request object
 * @returns {Promise<*>}
 */
const authMiddleware = (req) => {
    const bearerHeader = req.headers['authorization'];
    req.auth = getAuthDataFromToken(bearerHeader);
    return req;
}

module.exports = authMiddleware;