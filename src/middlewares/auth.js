const auth = require('../utills/auth');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === undefined) {
    return { status: 'UNAUTHORIZED', data: { message: 'Token not found' } };
  }
  try {
    const user = auth.verify(token);
    req.locals = { user };
    next();
  } catch (error) {
    return { status: 'UNAUTHORIZED', data: { message: 'jwt malformed' } };
  }
};