const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assurez-vous que ce chemin vers le modèle User est correct

const router = express.Router();

// Configuration de Passport pour utiliser la LocalStrategy avec email et mot de passe
passport.use(new LocalStrategy({
  usernameField: 'email', // Utilise 'email' au lieu du 'username' par défaut
  session: false // Nous utilisons les JWT, donc pas besoin de sessions
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: 'Identifiants incorrects.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Identifiants incorrects.' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Middleware pour générer un token pour un utilisateur
const generateUserToken = (req, res) => {
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '6h' });
  res.json({ message: 'Login réussi', token });
};

// Route d'inscription
router.post('/signup', async (req, res) => {
  const { username, email, password, equipeFavorite, joueurFavori, jeuFavori } = req.body; // Inclure les nouveaux champs ici
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Cette adresse email est déjà utilisée." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      equipeFavorite, // Assurez-vous que ces champs existent dans votre modèle Sequelize
      joueurFavori,   
      jeuFavori      
    });

    // Génération du token pour le nouvel utilisateur
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '6h' });

    // Envoi du token dans la réponse
    res.json({ message: 'Inscription réussie', token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// Route de connexion avec Passport
router.post('/login', passport.authenticate('local', { session: false }), generateUserToken);

module.exports = router;
