'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dbAbsenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      absen: {
        type: Sequelize.ENUM("HADIR", "IZIN", "TANPA KETERANGAN"),
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      idPengguna: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "dbPenggunas",
          key: "id",
          as: "transaksiId",
        },
      },
      tanggal: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dbAbsenses');
  }
};