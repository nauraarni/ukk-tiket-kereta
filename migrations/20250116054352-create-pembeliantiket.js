'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pembeliantikets', {
      id_pembelian_tiket: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal_pembelian: {
        type: Sequelize.DATE
      },
      id_pelanggan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Pelanggans",
          key: "id_pelanggan"
        },
      },
      id_jadwal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Jadwals",
          key: "id_jadwal"
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
    await queryInterface.dropTable('Pembeliantikets');
  }
};