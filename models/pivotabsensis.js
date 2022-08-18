'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pivotAbsensis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pivotAbsensis.init({
    idPengguna: DataTypes.INTEGER,
    idAbsensi: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'pivotAbsensis',
  });
  return pivotAbsensis;
};