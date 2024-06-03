const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: '193.203.168.1', // Adresse IP du serveur MySQL de Hostinger
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: console.log, // Pour activer les logs SQL
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
