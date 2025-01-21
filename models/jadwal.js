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
      // define association here
    }
  }
  Jadwal.init({
    asal_keberangkatan: DataTypes.STRING,
    tujuan_keberangkatan: DataTypes.STRING,
    tanggal_berangkat: DataTypes.DATE,
    tanggal_kedatangan: DataTypes.DATE,
    harga: DataTypes.DOUBLE,
    id_kereta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jadwal',
  });
  return Jadwal;
};