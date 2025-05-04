'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jadwal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Jadwal.hasMany(models.Pembeliantiket, {
        foreignKey: "id_jadwal",
        as: "pembelian_tiket"
      });
    }
  }
  Jadwal.init({
    asal_keberangkatan: DataTypes.STRING,
    tujuan_keberangkatan: DataTypes.STRING,
    tanggal_berangkat: DataTypes.DATE,
    tanggal_kedatangan: DataTypes.DATE,
    harga: DataTypes.DOUBLE,
    id_kereta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'Jadwal',
  });
  return Jadwal;
};