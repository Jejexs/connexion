const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const matchesRoute = require('./routes/api/matches');
const teamsRouter = require('./routes/api/teams');
const leagueOfLegendsRoutes = require('./routes/api/leagueoflegends');

const cors = require('cors');
require('./config/passport'); // Assurez-vous que ce chemin est correct
require('dotenv').config();

const app = express();

// Configurez CORS pour accepter les requêtes de votre client React
app.use(cors({
  origin: 'http://localhost:5173', // Autorisez l'origine de votre client React
  credentials: true, // Autorisez les credentials (cookies, sessions)
  methods: ['GET', 'POST', 'PUT', 'DELETE'] // Autorisez ces méthodes
}));


app.use(session({
  secret: 'B^k5R&4cR7X%eEzYHs2uB#n8@UdG*mP^FzC@L@rXu5e&3S!@yT2QzE#^4@R6kCz',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/matches', matchesRoute);
app.use('/api/teams', teamsRouter);
app.use('/api/leagueoflegends', leagueOfLegendsRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
