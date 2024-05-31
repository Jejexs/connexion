const mysql = require('mysql');

// Configuration de la base de données
const dbConfig = {
  host: 'localhost',      // Adresse de l'hôte de la base de données MySQL (localhost si la base de données est sur le même serveur)
  user: 'root',           // Nom d'utilisateur pour se connecter à la base de données MySQL
  password: '',           // Mot de passe pour se connecter à la base de données MySQL
  database: 'connect'     // Nom de la base de données à laquelle se connecter
};

// Création de la connexion à la base de données
const connection = mysql.createConnection(dbConfig);

// Connexion à la base de données
connection.connect(error => {
  if (error) {
    // Afficher une erreur si la connexion échoue
    throw error;
  }
  // Afficher un message de succès si la connexion est réussie
  console.log("Connexion réussie à la base de données MySQL!");
});

// Exporter la connexion pour l'utiliser dans d'autres fichiers
module.exports = connection;
