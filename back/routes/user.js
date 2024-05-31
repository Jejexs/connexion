const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
const User = require('../models/User');
const router = express.Router();

// Route de profil protégée
router.get('/profile', verifyToken, async (req, res) => {
  // Log pour vérifier le token
  console.log("Profile access attempt with token:", req.token);

  try {
    // Vérification et décodage du token JWT
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
    // Log pour vérifier le token décodé
    console.log("Token decoded:", decoded);

    // Recherche de l'utilisateur dans la base de données en utilisant l'ID décodé du token
    // Incluez gameFav, playerFav, et teamFav dans les attributs demandés
    const user = await User.findByPk(decoded.userId, {
      attributes: ['username', 'email', 'gameFav', 'playerFav', 'teamFav']
    });

    // Log pour vérifier l'utilisateur trouvé
    console.log("User found for profile:", user);

    if (user) {
      // Si l'utilisateur est trouvé, renvoyer les données de l'utilisateur, y compris gameFav, playerFav, et teamFav
      res.json(user);
    } else {
      // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    // Log pour les erreurs
    console.error("Profile access error:", error);
    // Si le token est invalide ou expiré, renvoyer une erreur 401
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
});

module.exports = router;
