"use strict";
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../../helpers/password");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuidv4(),
          name: "Tencent",
          email: "tencent@gmail.com",
          role: "publisher",
          password: hashPassword("123123123"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "Ubisoft",
          email: "ubisoft@gmail.com",
          role: "publisher",
          password: hashPassword("123123123"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "Nintendo",
          email: "nintendo@gmail.com",
          role: "publisher",
          password: hashPassword("123123123"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
