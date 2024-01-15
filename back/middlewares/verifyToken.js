const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  console.log("Bearer Header:", bearerHeader); // Log pour vérifier le header

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    console.log("Bearer Token:", bearerToken); // Log pour vérifier le token
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({ message: "Un token est requis pour l'authentification" });
  }
};

module.exports = verifyToken;
