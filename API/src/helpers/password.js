require("dotenv").config();
const bcrypt = require("bcrypt");

const { APP_SALT_ROUND } = process.env;
const generateSalt = () => bcrypt.genSaltSync(parseInt(APP_SALT_ROUND));

/**
 * hashPassword
 * @param {string} plainPassword
 * @returns {string}
 */
exports.hashPassword = (plainPassword) => {
  const salt = generateSalt();
  const password = bcrypt.hashSync(plainPassword, salt);
  return password;
};

/**
 * comparePassword
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {string}
 */
exports.comparePassword = (plainPassword, hashedPassword) =>
  bcrypt.compareSync(plainPassword, hashedPassword);
