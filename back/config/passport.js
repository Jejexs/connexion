const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('./database');


passport.use(new LocalStrategy(
    { usernameField: 'email' }, // ou 'username' selon votre préférence
    (email, password, done) => {
      // Ici, vous devez rechercher l'utilisateur dans votre base de données
      db.query('SELECT id, email, password FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
          return done(err);
        }
        if (results.length === 0) {
          return done(null, false, { message: 'Utilisateur non trouvé.' });
        }
  
        const user = results[0];
  
        // Vérifiez si le mot de passe est correct
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Mot de passe incorrect.' });
          }
        });
      });
    }
  ));
  
  // Sérialisation de l'utilisateur dans la session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Désérialisation de l'utilisateur de la session
  passport.deserializeUser((id, done) => {
    db.query('SELECT id, email FROM users WHERE id = ?', [id], (err, results) => {
      if (err) {
        return done(err);
      }
      done(null, results[0]);
    });
  });
  