const _ = require("lodash");
const { User } = require("../databases/models");
const { errorResponse, successResponse } = require("../helpers/response");

exports.getUsers = async (req, res, next) => {
  try {
    const roleQuery = !_.isEmpty(req.query.role)
      ? { role: req.query.role }
      : {};
    const users = await User.findAll({
      where: { ...roleQuery },
    });
    successResponse(res)(200, { data: users });
  } catch (err) {
    errorResponse(res)(500);
  }
};

exports.getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (_.isEmpty(user)) {
      return errorResponse(res)(404);
    }
    req.user = user;
    next();
  } catch (err) {
    errorResponse(res)(500);
  }
};

exports.returnUser = (req, res) =>
  successResponse(res)(200, { data: req.user });
