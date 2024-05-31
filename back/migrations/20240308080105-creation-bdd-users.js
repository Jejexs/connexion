'use strict';

module.exports = {
  // Méthode "up" : exécute les changements pour cette migration
  up: async (queryInterface, Sequelize) => {
    // Création de la table "Users"
    await queryInterface.createTable('Users', {
      id: {
        // Clé primaire auto-incrémentée et non nulle
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        // Champ pour le nom d'utilisateur
        type: Sequelize.STRING
      },
      email: {
        // Champ pour l'adresse email
        type: Sequelize.STRING
      },
      password: {
        // Champ pour le mot de passe (à hacher avant de le stocker)
        type: Sequelize.STRING
      },
      teamFav: {
        // Champ pour l'équipe favorite de l'utilisateur
        type: Sequelize.STRING
      },
      playerFav: {
        // Champ pour le joueur favori de l'utilisateur
        type: Sequelize.STRING
      },
      gameFav: {
        // Champ pour le jeu favori de l'utilisateur
        type: Sequelize.STRING
      },
      isAdmin: {
        // Champ booléen pour indiquer si l'utilisateur est administrateur
        type: Sequelize.BOOLEAN,
        allowNull: false,  // Ne peut pas être nul
        defaultValue: false  // Valeur par défaut : false
      },
      isNewsletter: {
        // Champ booléen pour indiquer si l'utilisateur est abonné à la newsletter
        type: Sequelize.BOOLEAN,
        allowNull: false,  // Ne peut pas être nul
        defaultValue: false  // Valeur par défaut : false
      },
      createdAt: {
        // Champ pour la date de création (ajouté automatiquement par Sequelize)
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        // Champ pour la date de mise à jour (ajouté automatiquement par Sequelize)
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  // Méthode "down" : annule les changements de cette migration
  down: async (queryInterface, Sequelize) => {
    // Suppression de la table "Users"
    await queryInterface.dropTable('Users');
  }
};
