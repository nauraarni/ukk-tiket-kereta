'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Detailpembelians', {
      id_detail_pembelian: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nik: {
        type: Sequelize.STRING
      },
      nama_penumpang: {
        type: Sequelize.STRING
      },
      id_pembelian_tiket: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Pembeliantikets",
          key: "id_pembelian_tiket"
        },
      },
      id_kursi: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Detailpembelians');
  }
};