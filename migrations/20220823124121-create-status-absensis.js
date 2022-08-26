'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('statusAbsenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idPengguna: {
        type: Sequelize.INTEGER
      },
      stat: {
        type: Sequelize.ENUM("HADIR", "DEFAULT","IZIN"),
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
    await queryInterface.dropTable('statusAbsenses');
  }
};