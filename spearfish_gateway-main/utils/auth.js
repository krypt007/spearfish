'use strict'

const jwt = require('jsonwebtoken');

const generateJWT = async (payload) => {
  const aDay = 60 * 60 * 24;
  const token = await jwt.sign(payload,
    process.env.SECRET_KEY, { expiresIn: aDay }
  );

  return token;
}

module.exports = {
  generateJWT
}
