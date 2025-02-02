const jwt = require('jsonwebtoken');

function jwtMiddlewareLogin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No valid user' });
  }
  next();
}

module.exports = jwtMiddlewareLogin;
