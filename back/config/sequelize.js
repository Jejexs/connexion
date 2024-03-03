const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('connect', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
