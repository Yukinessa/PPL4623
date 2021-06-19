const _ = require("lodash");
const { User } = require("../databases/models");
const { errorResponse, successResponse } = require("../helpers/response");

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
