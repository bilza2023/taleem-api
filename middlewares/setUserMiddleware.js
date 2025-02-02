
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../schemas/User');


async function setUserMiddleware(req, res, next) {
  debugger;
  const token = req.headers.authorization?.split(' ')[1]; // Extract token

  if (!token) {
    req.user = null; // No token provided, set user to null
    return next();
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret key
    
    // Fetch the user from the database
    const user = await User.findById(decoded.id);
    
    req.user = user || null; // Attach user if found, otherwise set to null
  } catch (err) {
    req.user = null; // Invalid token, set user to null
  }

  next();
}

module.exports = setUserMiddleware;
