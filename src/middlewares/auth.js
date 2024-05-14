const { decoded } = require('../utills/auth');

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

const authToken = async (req, res, next) => {
  const bearerToken = req.header('Authorization');
  if (!bearerToken) {
    return res.status(401).json({ status: 'UNAUTHORIZED', message: 'Token not found' });
  }
  try {
    const token = extractToken(bearerToken);
    const decod = decoded(token);
    console.log(decod);
    next();
  } catch (error) {
    return res.status(401).json({ status: 'UNAUTHORIZED', message: 'Expired or invalid token' });
  }
};

module.exports = {
  authToken,
};
