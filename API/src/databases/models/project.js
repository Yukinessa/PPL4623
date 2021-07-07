"use strict";
const _ = require("lodash");
const { GAME_GENRE } = require("../../constants/project");

const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Project.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      genre: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: _.values(GAME_GENRE),
        defaultValue: GAME_GENRE.ADVENTURE,
      },
      ageStrict: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      linkDownload: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
