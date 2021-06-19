"use strict";
const _ = require("lodash");
const { USER_ROLE } = require("../../constants/user");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING(60),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(150),
      },
      role: {
        allowNull: false,
        type: Sequelize.ENUM(_.values(USER_ROLE)),
        defaultValue: USER_ROLE.PUBLISHER,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
