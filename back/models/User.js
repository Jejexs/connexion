const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Assurez-vous que ce chemin est correct

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'user',
    timestamps: true,
  });
module.exports = User;
