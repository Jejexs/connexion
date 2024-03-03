const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
const User = require('../models/User');
const router = express.Router();

// Route de profil protégée
router.get('/profile', verifyToken, async (req, res) => {
  console.log("Profile access attempt with token:", req.token); // Log pour vérifier le token
  try {
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded); // Log pour vérifier le token décodé
    const user = await User.findByPk(decoded.userId, { attributes: ['username', 'email'] });
    console.log("User found for profile:", user); // Log pour vérifier l'utilisateur trouvé
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Profile access error:", error); // Log pour les erreurs
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
});

module.exports = router;
