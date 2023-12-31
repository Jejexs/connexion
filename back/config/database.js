const mysql = require('mysql');

// Configuration de la base de données
const dbConfig = {
  host: 'localhost',      // ou l'adresse de votre serveur MySQL
  user: 'root', // votre nom d'utilisateur MySQL
  password: '',  // votre mot de passe MySQL
  database: 'connect'    // le nom de votre base de données
};

// Création de la connexion
const connection = mysql.createConnection(dbConfig);

// Connexion à la base de données
connection.connect(error => {
  if (error) throw error;
  console.log("Connexion réussie à la base de données MySQL!");
});

module.exports = connection;
