'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Petugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Petugas.init({
    nama_petugas: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    telp: DataTypes.STRING,
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      }
  }, {
    sequelize,
    modelName: 'Petugas',
  });
  return Petugas;
};