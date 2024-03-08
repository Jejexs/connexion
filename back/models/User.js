// connexion\back\models\User.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  equipeFavorite: DataTypes.STRING,
  joueurFavori: DataTypes.STRING,
  jeuFavori: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'user',
  timestamps: true,
});

module.exports = User;
