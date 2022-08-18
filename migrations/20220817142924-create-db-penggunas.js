"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("dbPenggunas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      panggilan: { type: Sequelize.STRING },
      password: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM("Produksi", "Marketing", "Freelancer"),
      },
      gender: {
        type: Sequelize.ENUM("Laki-Laki", "Perempuan"),
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("dbPenggunas");
  },
};
