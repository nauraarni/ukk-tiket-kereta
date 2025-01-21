'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Gerbongs', {
      id_gerbong: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_gerbong: {
        type: Sequelize.STRING
      },
      kuota: {
        type: Sequelize.INTEGER
      },
      id_kereta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Kereta",
          key: "id_kereta"
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
    await queryInterface.dropTable('Gerbongs');
  }
};