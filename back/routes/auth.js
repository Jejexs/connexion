const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Vérification de la complexité du mot de passe
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre." });
  }

  // Vérifier si l'email est déjà utilisé
  db.query('SELECT email FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la vérification de l'email." });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: "Cette adresse email est déjà utilisée." });
    }

    // Si l'email est libre et le mot de passe valide, continuez l'inscription
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (insertErr, insertResults) => {
      if (insertErr) {
        return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
      }
      return res.status(200).json({ message: 'Inscription réussie' });
    });
  });
});



// Route de connexion
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
    if (users.length === 0) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    const user = users[0];

    // Vérifier le mot de passe
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la connexion' });
      }
      if (!isMatch) {
        return res.status(401).json({ message: 'Identifiants incorrects' });
      }

      // Créer un token JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Expire dans 1 heure
      });

      res.json({ token });
    });
  });
});



module.exports = router;
