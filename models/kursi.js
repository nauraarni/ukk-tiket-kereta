'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kursi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kursi.init({
    id_kursi :{
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    no_kursi: DataTypes.STRING,
    id_gerbong: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kursi',
  });
  return Kursi;
};