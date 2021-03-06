"use strict";
const _ = require("lodash");
const { GAME_GENRE } = require("../../constants/project");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Users",
            schema: "public",
          },
          key: "id",
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      genre: {
        allowNull: false,
        type: Sequelize.ENUM(_.values(GAME_GENRE)),
        defaultValue: GAME_GENRE.ADVENTURE,
      },
      ageStrict: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      linkDownload: {
        allowNull: false,
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("Projects");
  },
};
