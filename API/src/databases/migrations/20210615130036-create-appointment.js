"use strict";
const _ = require("lodash");
const { APPOINTMENT_STATUS } = require("../../constants/appointment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Appointments", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      publisherId: {
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
      designerId: {
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
      projectId: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Projects",
            schema: "public",
          },
          key: "id",
        },
      },
      meetDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      activity: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(_.values(APPOINTMENT_STATUS)),
        defaultValue: APPOINTMENT_STATUS.PENDING,
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
    await queryInterface.dropTable("Appointments");
  },
};
