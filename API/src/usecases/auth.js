const _ = require("lodash");
const { User } = require("../databases/models");
const { generateJwt, validationJwt } = require("../helpers/jwt");
const { comparePassword, hashPassword } = require("../helpers/password");
const { errorResponse, successResponse } = require("../helpers/response");

exports.login = async (req, res) => {
  try {
    const {
      user,
      body: { password },
    } = req;
    const { id, email } = user;
    if (!comparePassword(password, user.password)) {
      return errorResponse(res)(460);
    }
    const accessToken = generateJwt({ userId: id }, { expiresIn: "24h" });
    successResponse(res)(200, {
      data: { email },
      cookie: {
        name: "token",
        value: accessToken,
        opt: {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 30 * 24 * 60 * 60 * 24 * 1000,
        },
      },
    });
  } catch (err) {
    errorResponse(res)(500);
  }
};

exports.signUp = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.create({
      ...req.body,
      password: hashPassword(password),
    });
    const { id: userId, email } = user;
    const accessToken = generateJwt({ userId }, { expiresIn: "24h" });
    successResponse(res)(201, {
      data: { email },
      cookie: {
        name: "token",
        value: accessToken,
        opt: {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 30 * 24 * 60 * 60 * 24 * 1000,
        },
      },
    });
  } catch (err) {
    errorResponse(res)(500);
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return errorResponse(res)(401);
    }
    const decoded = validationJwt(token);
    const { userId } = decoded;
    const user = await User.findByPk(userId);
    if (_.isEmpty(user)) {
      return errorResponse(res)(404);
    }
    req.user = user;
    next();
  } catch (err) {
    errorResponse(res)(461);
  }
};

exports.authorization = (role) => {
  return (req, res, next) => {
    const { user } = req;
    if (!(role.indexOf(user.role) > -1)) {
      return errorResponse(res)(403);
    }
    next();
  };
};

exports.logout = (req, res) => {
  try {
    successResponse(res)(200, {
      cookie: {
        name: "token",
        value: "",
        opt: {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 0,
        },
      },
    });
  } catch (err) {
    errorResponse(res)(500);
  }
};
