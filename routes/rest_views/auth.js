const keystone = require('keystone');
const jwt = require('jsonwebtoken');

/*
  JWT auth views
*/

// Signin retrieve JWT - {username, password}
exports.tokenRetrieve = function (req, res) {
  
  const errorMessage = 'Sorry, there was an issue in retrieving JWT token, please try again.';
  if (!req.body.username || !req.body.password) return res.status(401).json({ error: errorMessage });
  
  keystone.list('User').model.findOne({ email: req.body.username }).exec(function(err, user) {
    
    if (err || !user) {
      return res.status(401).json({
        error: (err && err.message ? err.message : false) || errorMessage
      });
    }
    
    const jwtData = {
      user: user.id,
      
    }
    const jwtToken = jwt.sign(
      jwtData,
      keystone._options.rest.jwtSecret,
      { expiresIn: keystone._options.rest.jwtExpires }
    );

    return res.json({
      token: jwtToken
    });

  });

}

exports.tokenRefresh = function (req, res) {
  
}

exports.tokenVerify = function (req, res) {
  const errorMessage = 'Sorry, there was an issue in verifying JWT token, please try again.';

  if (!req.body.token) return res.status(400).json({ error: errorMessage});

  try {
    var decoded = jwt.verify(req.body.token, keystone._options.rest.jwtSecret);
    return res.json({ token: req.body.token})
  } catch(err) {}

  return res.json({ error: errorMessage})
}

