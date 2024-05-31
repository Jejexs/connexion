const { Sequelize } = require('sequelize');

// Initialisation de Sequelize avec les informations de connexion à la base de données
const sequelize = new Sequelize('connect', 'root', '', {
  host: 'localhost', // Adresse du serveur MySQL
  dialect: 'mysql' // Type de base de données utilisée (MySQL)
});

// Exportation de l'instance Sequelize pour être utilisée dans d'autres parties de l'application
module.exports = sequelize;
