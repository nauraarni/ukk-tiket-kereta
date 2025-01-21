'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kursis', {
      id_kursi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_kursi: {
        type: Sequelize.STRING
      },
      id_gerbong: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Gerbongs",
          key: "id_gerbong"
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Kursis');
  }
};