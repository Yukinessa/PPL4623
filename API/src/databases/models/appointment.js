"use strict";
const _ = require("lodash");
const { Model, Sequelize } = require("sequelize");
const { APPOINTMENT_STATUS } = require("../../constants/appointment");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsTo(models.User, {
        foreignKey: "publisherId",
        as: "publisher",
      });
      Appointment.belongsTo(models.User, {
        foreignKey: "designerId",
        as: "designer",
      });
      Appointment.belongsTo(models.Project, {
        foreignKey: "projectId",
        as: "project",
      });
    }
  }
  Appointment.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      publisherId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      designerId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      projectId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: "Projects",
          key: "id",
        },
      },
      meetDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      activity: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      information: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: _.values(APPOINTMENT_STATUS),
        defaultValue: APPOINTMENT_STATUS.PENDING,
      },
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
