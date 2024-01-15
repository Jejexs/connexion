const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cors = require('cors');
require('./config/passport'); // Configuration de Passport
require('dotenv').config();


const app = express();

app.use(cors()); // Ajoutez cette ligne


// Configuration des sessions
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: false
}));

// Initialisation de Passport
app.use(passport.initialize());
app.use(passport.session());

// Parseur de corps de requête
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utilisation des routes d'authentification
app.use('/auth', authRoutes);

// Utilisation des routes utilisateur
app.use('/api', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
``
