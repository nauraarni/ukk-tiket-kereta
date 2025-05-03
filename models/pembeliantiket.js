'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pembeliantiket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pembeliantiket.hasMany(models.Detailpembelian, {
        foreignKey: "id_pembelian_tiket",
        as: "detail_pembelian"
      });
    }
  }
  Pembeliantiket.init({
    id_pembelian_tiket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tanggal_pembelian: DataTypes.DATE,
    id_pelanggan: DataTypes.INTEGER,
    id_jadwal: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pembeliantiket',
  });
  return Pembeliantiket;
};