const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const matchesRoute = require('./routes/api/matches');
const teamsRouter = require('./routes/api/teams');
const cors = require('cors');
require('./config/passport');
require('dotenv').config();

const app = express();

// Configurez CORS pour accepter les requêtes de votre client React
app.use(cors({
  origin: 'http://localhost:5173', // Autorisez l'origine de votre client React
  credentials: true, // Autorisez les credentials (cookies, sessions)
  methods: ['GET', 'POST', 'PUT', 'DELETE'] // Autorisez ces méthodes
}));

// Configuration de la session
app.use(session({
  secret: 'B^k5R&4cR7X%eEzYHs2uB#n8@UdG*mP^FzC@L@rXu5e&3S!@yT2QzE#^4@R6kCz', // Clé secrète pour signer les cookies de session
  resave: false, // Ne pas sauvegarder la session si elle n'est pas modifiée
  saveUninitialized: false // Ne pas créer de session tant qu'il n'y a pas de données
}));

// Initialisation de Passport.js pour la gestion de l'authentification
app.use(passport.initialize());
app.use(passport.session());

// Configuration du body-parser pour parser les requêtes entrantes en JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Définition des routes de l'application
app.use('/auth', authRoutes); // Routes d'authentification
app.use('/api', userRoutes); // Routes pour les utilisateurs
app.use('/api/matches', matchesRoute); // Routes pour les matchs
app.use('/api/teams', teamsRouter); // Routes pour les équipes

// Démarrage du serveur
const PORT = process.env.PORT || 3000; // Utilisation du port spécifié dans les variables d'environnement ou 3000 par défaut
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`); // Message de confirmation lorsque le serveur est démarré
});
