const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/verifyToken'); // Assurez-vous que le chemin est correct
const db = require('./config/database'); // Votre configuration de base de données

const app = express();

// ... (autres configurations et routes)

// Route de profil protégée
app.get('/api/profile', verifyToken, (req, res) => {
  try {
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
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
});
