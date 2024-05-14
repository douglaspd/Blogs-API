const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretJWT';

const JWT_CONFIG = { 
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, JWT_CONFIG);
  return token;
};

const decoded = (token) => {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
};

module.exports = {
  createToken,
  decoded,
};