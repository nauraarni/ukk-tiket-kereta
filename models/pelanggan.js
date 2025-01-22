'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pelanggan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pelanggan.init({
    nik: DataTypes.STRING,
    nama_penumpang: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    telp: DataTypes.STRING,
    id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'Pelanggan',
  });
  return Pelanggan;
};