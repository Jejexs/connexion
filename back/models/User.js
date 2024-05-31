// Importation des modules nécessaires depuis Sequelize et le fichier de configuration Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Définition de la classe User en tant que modèle Sequelize
class User extends Model { }

// Initialisation du modèle User avec les attributs de la table Users
User.init({
  // Attribut pour le nom d'utilisateur
  username: DataTypes.STRING,
  
  // Attribut pour l'adresse email
  email: DataTypes.STRING,
  
  // Attribut pour le mot de passe (il est conseillé de le hacher avant de le stocker)
  password: DataTypes.STRING,
  
  // Attribut pour l'équipe favorite de l'utilisateur
  teamFav: DataTypes.STRING,
  
  // Attribut pour le joueur favori de l'utilisateur
  playerFav: DataTypes.STRING,
  
  // Attribut pour le jeu favori de l'utilisateur
  gameFav: DataTypes.STRING,
  
  // Attribut pour définir si l'utilisateur est administrateur
  isAdmin: {
    type: DataTypes.BOOLEAN,  // Type de donnée booléenne
    allowNull: false,         // Ne peut pas être nul
    defaultValue: false       // Valeur par défaut : false
  },
  
  // Attribut pour définir si l'utilisateur est abonné à la newsletter
  isNewsletter: {
    type: DataTypes.BOOLEAN,  // Type de donnée booléenne
    allowNull: false,         // Ne peut pas être nul
    defaultValue: false       // Valeur par défaut : false
  },
}, {
  // Options pour l'initialisation du modèle
  sequelize,                   // Instance Sequelize à utiliser
  modelName: 'Users',          // Nom du modèle (et de la table dans la base de données)
  timestamps: true,            // Ajoute automatiquement les champs createdAt et updatedAt
});

// Exportation du modèle User pour l'utiliser dans d'autres parties de l'application
module.exports = User;
