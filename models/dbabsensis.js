"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dbAbsensis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dbAbsensis.belongsToMany(models.dbPenggunas, {
        through: models.pivotAbsensis,
        as: "Pengguna",
        foreignKey: "idAbsensi",
      });
    }
  }
  dbAbsensis.init(
    {
      absen: DataTypes.ENUM("HADIR", "IZIN", "TANPA KETERANGAN"),
      keterangan: DataTypes.STRING,
      idPengguna: DataTypes.INTEGER,
      tanggal: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "dbAbsensis",
    }
  );
  return dbAbsensis;
};
