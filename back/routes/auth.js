const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

passport.use(new LocalStrategy({
  usernameField: 'email',
  session: false
}, async (email, password, done) => {
  try {
    console.log(`Recherche de l'utilisateur par email : ${email}`);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Aucun utilisateur trouvé avec cet email.');
      return done(null, false, { message: 'Identifiants incorrects.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Mot de passe incorrect.');
      return done(null, false, { message: 'Identifiants incorrects.' });
    }
    return done(null, user);
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    return done(error);
  }
}));

router.post('/signup', [
  body('email').isEmail().withMessage('L\'email doit être valide.'),
  body('password').isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères.')
    .matches(/[0-9]/).withMessage('Le mot de passe doit contenir au moins un chiffre.')
    .matches(/[a-z]/).withMessage('Le mot de passe doit contenir au moins une lettre minuscule.')
    .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une lettre majuscule.')
    .matches(/[\W]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial.'),
  body('username').not().isEmpty().withMessage('Le nom d\'utilisateur ne peut pas être vide.')
], async (req, res) => {
  console.log('Début du processus d\'inscription');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Erreurs de validation:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password, teamFav, playerFav, gameFav, isNewsletter } = req.body;
  console.log(`Inscription de l'utilisateur : ${username}`);
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      console.log('Email déjà utilisé.');
      return res.status(400).json({ message: "Cette adresse email est déjà utilisée." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username, email, password: hashedPassword, teamFav, playerFav, gameFav, isNewsletter: isNewsletter ? 1 : 0
    });
    console.log(`Nouvel utilisateur créé : ${newUser.id}`);
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '6h' });
    res.json({ message: 'Inscription réussie', token });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  console.log(`Utilisateur connecté: ${req.user.id}`);
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '6h' });
  res.json({ message: 'Login réussi', token });
});

module.exports = router;
