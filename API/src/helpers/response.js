const _ = require("lodash");
const { HTTP_RESPONSE } = require("../constants/http");

/**
 * successResponse
 * @typedef {import('express').Response} Response
 * @param {Response} res
 * @param {number} code
 * @typedef {{name: string, value: string, opt: object}} Cookie
 * @typedef {{data: object, cookie: Cookie}} Options
 * @param {Options} options
 * @returns {{success:boolean, data: object}}
 */
exports.successResponse = (res) => (code, options) => {
  if (!_.isEmpty(options?.cookie)) {
    const { name, value, opt } = options?.cookie;
    return res.status(code).cookie(name, value, opt).json({
      success: true,
      data: options?.data,
    });
  }
  return res.status(code).json({
    success: true,
    data: options?.data,
  });
};

/**
 * errorResponse
 * @typedef {import('express').Response} Response
 * @param {Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {object} detail
 * @returns {{success:boolean, error: {code, detail}}}
 */
exports.errorResponse =
  (res) =>
  (statusCode, detail = undefined) => {
    const { code, message } = HTTP_RESPONSE[statusCode];
    return res.status(code).json({
      success: false,
      error: { code, message, detail },
    });
  };
