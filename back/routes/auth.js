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

const generateUserToken = (req, res) => {
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '6h' });
  res.json({ message: 'Login réussi', token });
};

router.post('/signup', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('username').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password, teamFav, playerFav, gameFav } = req.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Cette adresse email est déjà utilisée." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username, email, password: hashedPassword, teamFav, playerFav, gameFav
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '6h' });
    res.json({ message: 'Inscription réussie', token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post('/login', passport.authenticate('local', { session: false }), generateUserToken);

module.exports = router;
