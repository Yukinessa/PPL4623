"use strict";
const _ = require("lodash");
const { Model, Sequelize } = require("sequelize");
const { USER_ROLE } = require("../../constants/user");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: _.values(USER_ROLE),
        defaultValue: USER_ROLE.PUBLISHER,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
