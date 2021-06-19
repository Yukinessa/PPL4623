require("dotenv").config();
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

/**
 * generateToken
 * @param {object} data
 * @typedef {{expiresIn: string or number}} Optional
 * @param {Optional} optional
 * @returns {string}
 */
exports.generateJwt = (data, optional) => jwt.sign(data, JWT_SECRET, optional);

/**
 * validationToken
 * @param {string} token
 * @returns {object}
 */
exports.validationJwt = (token) => jwt.verify(token, JWT_SECRET);
