const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
const db = require('../config/database'); // Votre configuration de base de données
const router = express.Router();



// ... (autres configurations et routes)

// Route de profil protégée
router.get('/profile', verifyToken, (req, res) => {
  console.log("Route /profile atteinte");
  try {
    console.log("Token pour vérification:", req.token, "Clé secrète:", process.env.JWT_SECRET);
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Requête à la base de données pour obtenir les informations de l'utilisateur
    db.query('SELECT username, email FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erreur lors de la récupération des informations de l'utilisateur" });
      }
      if (results.length > 0) {
        const user = results[0];
        res.json(user); // Envoyez les informations de l'utilisateur au client
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    });
  } catch (error) {
    console.error("Erreur de vérification du token:", error);
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
});

module.exports = router;
