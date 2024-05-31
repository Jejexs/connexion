const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Configuration de la stratégie de connexion locale de Passport
passport.use(new LocalStrategy({ usernameField: 'email' }, 
  async (email, password, done) => {
    try {
      // Recherche de l'utilisateur par email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: 'Utilisateur non trouvé.' });
      }

      // Comparaison des mots de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Mot de passe incorrect.' });
      }

      // Si tout est correct, renvoyer l'utilisateur
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Sérialisation de l'utilisateur pour la session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Désérialisation de l'utilisateur à partir de la session
passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  }).catch(done);
});
