'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gerbong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gerbong.init({
    id_gerbong : {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nama_gerbong: DataTypes.STRING,
    kuota: DataTypes.INTEGER,
    id_kereta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Gerbong',
  });
  return Gerbong;
};