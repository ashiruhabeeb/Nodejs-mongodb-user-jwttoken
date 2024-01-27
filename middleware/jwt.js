const jwt = require('jsonwebtoken');
const config = require('../config/config');

const createToken = (id) => {
    return jwt.sign({id}, config.secretKey, {
        expiresIn: (90 * 24 * 60 * 60)
    });
};

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization) return res.status(401).json({msg: 'Not authorized. No token'});

    if(req.headers.authorization.startsWith("Bearer ")){
      const token = req.headers.authorization.split(' ')[1] // get the second el which is the token itself(without the "Bearer" text)

      jwt.verify(token, config.secretKey, (err, data) => {
        if(err) return res.status(401).json({msg: 'Wrong or expired token.'});
        else {
          req.user = data // an object with only the user id as its property
          next();
        };
      });
    } else {
        return res.status(401).json({msg: 'Not authorized. No token'});
    };
};

const authenticateToken = (req, res, next) => {
  // Extract the token from the authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split('')[1];

  if (!token){
    return res.status(401).json({ message: 'No token provided' });
  }

  // verify and decode the token
  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err){
      return res.status(403).json({message: 'Invalid token'});
    };

    req.user = decoded;
    next();
  });
};

module.exports = { createToken, verifyToken, authenticateToken };
