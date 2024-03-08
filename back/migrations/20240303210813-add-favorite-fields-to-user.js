'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'equipeFavorite', Sequelize.STRING);
    await queryInterface.addColumn('Users', 'joueurFavori', Sequelize.STRING);
    await queryInterface.addColumn('Users', 'jeuFavori', Sequelize.STRING);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'equipeFavorite');
    await queryInterface.removeColumn('Users', 'joueurFavori');
    await queryInterface.removeColumn('Users', 'jeuFavori');
  }
};
