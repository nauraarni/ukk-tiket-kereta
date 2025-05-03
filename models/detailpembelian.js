'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detailpembelian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Detailpembelian.belongsTo(models.Pembeliantiket, {
        foreignKey: "id_pembelian_tiket",
        as: "pembelian_tiket"
      });
    }
  }
  Detailpembelian.init({
    id_detail_pembelian :{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nik: DataTypes.STRING,
    nama_penumpang: DataTypes.STRING,
    id_pembelian_tiket: DataTypes.INTEGER,
    id_kursi: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detailpembelian',
  });
  return Detailpembelian;
};