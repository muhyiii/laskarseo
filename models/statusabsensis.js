"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class statusAbsensis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  statusAbsensis.init(
    {
      idPengguna: DataTypes.INTEGER,
      stat: DataTypes.ENUM("HADIR", "DEFAULT","IZIN"),
    },
    {
      sequelize,
      modelName: "statusAbsensis",
    }
  );
  return statusAbsensis;
};
