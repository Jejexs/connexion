const jwt = require('jsonwebtoken');

// Middleware de vérification du token
const verifyToken = (req, res, next) => {
  // Récupère le header d'autorisation
  const bearerHeader = req.headers['authorization'];
  console.log("Bearer Header:", bearerHeader); // Log pour vérifier le header

  // Vérifie si le header d'autorisation est défini
  if (typeof bearerHeader !== 'undefined') {
    // Divise le header pour obtenir le token
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    console.log("Bearer Token:", bearerToken); // Log pour vérifier le token
    // Assigne le token à la requête pour une utilisation ultérieure
    req.token = bearerToken;
    // Passe au middleware ou à la route suivante
    next();
  } else {
    // Si le header d'autorisation n'est pas défini, renvoie une erreur 403
    res.status(403).json({ message: "Un token est requis pour l'authentification" });
  }
};

module.exports = verifyToken;
