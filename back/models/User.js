// connexion\back\models\User.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class User extends Model { }

User.init({
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  teamFav: DataTypes.STRING,
  playerFav: DataTypes.STRING,
  gameFav: DataTypes.STRING,
  // Ajout des nouvelles colonnes
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isNewsletter: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
}, {
  sequelize,
  modelName: 'Users',
  timestamps: true,
});

module.exports = User;
