
const keystone = require('keystone');
const jwt = require('jsonwebtoken');

/*
  JWT middleware
*/

exports.requireJwtAuth = function(req, res, next) {
  const errorMessage = {
    badHeader: 'Bad request - missing JWT header',
    unauthorized: 'Unauthorized - JWT',
  };

  // Enable auth with current Keystone's browser session
  if (req.user) {
    next();
    return;
  }

  // Validate JWT header
  if (!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith("JWT ")) {
    return res.status(400).json({ error: errorMessage.badHeader })
  }
  
  const token = req.headers.authorization.substr(4);
  const secret = keystone._options.rest.jwtSecret;
  
  // Decode and verify JWT header
  try {
    var decoded = jwt.verify(token, secret);
    keystone.list('User').model.findOne({ _id: decoded.user }).exec(function(err, user) {
      req.user = user;
      next();
    });
    return;
  } catch(err) {
    // err
  }
  
  // Defaults to failure
  return res.status(403).json({ error: errorMessage.unauthorized });
}
