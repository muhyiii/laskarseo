"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dbPenggunas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dbPenggunas.belongsToMany(models.dbAbsensis, {
        through: models.pivotAbsensis,
        as: "Absensi",
        foreignKey: "idPengguna",
      });
      dbPenggunas.hasMany(models.dbAbsensis, {
        as: "absen",
        foreignKey: "idPengguna",
      });
    }
  }
  dbPenggunas.init(
    {
      nama: DataTypes.STRING,
      username: DataTypes.STRING,
      panggilan: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM("Produksi", "Marketing", "Freelancer"),
      gender: DataTypes.ENUM("Laki-Laki", "Perempuan"),
    },
    {
      sequelize,
      modelName: "dbPenggunas",
    }
  );
  return dbPenggunas;
};
