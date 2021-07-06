const _ = require("lodash");
const { Appointment, Project, User } = require("../databases/models");
const { errorResponse, successResponse } = require("../helpers/response");
const { USER_ROLE } = require("../constants/user");
const { APPOINTMENT_STATUS } = require("../constants/appointment");
const { Op } = require("sequelize");
const dayjs = require("dayjs");

exports.getAppointments = async (req, res) => {
  try {
    const { publisherId, designerId, status } = req.query;
    const publisherQuery = !_.isEmpty(publisherId) ? { publisherId } : {};
    const designerQuery = !_.isEmpty(designerId) ? { designerId } : {};
    const statusQuery = !_.isEmpty(status) ? { status } : {};
    const appointments = await Appointment.findAll({
      attributes: ["id", "meetDate", "status", "activity"],
      include: [
        {
          model: User,
          as: "publisher",
          required: false,
          attributes: ["name"],
        },
        {
          model: User,
          as: "designer",
          required: false,
          attributes: ["name"],
        },
      ],
      where: { ...publisherQuery, ...designerQuery, ...statusQuery },
    });
    successResponse(res)(200, { data: appointments });
  } catch (err) {
    errorResponse(res)(500, err.message);
  }
};

exports.storeAppointment = async (req, res) => {
  try {
    const { id: designerId } = req.user;
    await Appointment.create({ ...req.body, designerId });
    successResponse(res)(201);
  } catch (err) {
    errorResponse(res)(500, err.message);
  }
};

exports.getAppointmentByAppointmentId = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findByPk(appointmentId, {
      attributes: ["id", "meetDate", "status", "activity", "information"],
      include: [
        {
          model: Project,
          as: "project",
          required: false,
        },
        {
          model: User,
          as: "publisher",
          required: false,
          attributes: ["name"],
        },
        {
          model: User,
          as: "designer",
          required: false,
          attributes: ["name"],
        },
      ],
    });
    if (_.isEmpty(appointment)) {
      return errorResponse(res)(404);
    }
    successResponse(res)(200, { data: appointment });
  } catch (err) {
    errorResponse(res)(500, err.message);
  }
};

exports.updateAppointmentByAppointmentId = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { projectId, meetDate, activity, information } = req.body;
    const result = await Appointment.update(
      { projectId, meetDate, activity, information },
      { where: { id: appointmentId } }
    );
    if (!result[0]) {
      return errorResponse(res)(400);
    }
    successResponse(res)(201);
  } catch (err) {
    errorResponse(res)(500);
  }
};

exports.updateStatusAppointmentByAppointmentId = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { appointmentId } = req.params;
    const { status } = req.body;
    const appointment = await Appointment.findByPk(appointmentId);
    if (_.isEmpty(appointment)) {
      return errorResponse(res)(404);
    }
    appointment.status = status;
    await appointment.save();
    successResponse(res)(201);
  } catch (err) {
    errorResponse(res)(500, err.message);
  }
};

exports.deleteAppointmentByAppointmentId = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const result = await Appointment.destroy({ where: { id: appointmentId } });
    if (!result) {
      return errorResponse(res)(400);
    }
    successResponse(res)(201);
  } catch (err) {
    errorResponse(res)(500);
  }
};

exports.getAppointmentToday = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const queryUser =
      role === USER_ROLE.PUBLISHER
        ? { publisherId: userId }
        : { designerId: userId };
    const { rows, count } = await Appointment.findAndCountAll({
      attributes: ["id", "meetDate", "activity"],
      include: [
        {
          model: User,
          as: "publisher",
          required: false,
          attributes: ["name"],
        },
        {
          model: User,
          as: "designer",
          required: false,
          attributes: ["name"],
        },
      ],
      where: {
        ...queryUser,
        status: APPOINTMENT_STATUS.ACCEPTED,
        meetDate: { [Op.gt]: dayjs().format("YYYY-MM-DD 00:00") },
        meetDate: { [Op.lte]: dayjs().format("YYYY-MM-DD 23:59") },
      },
    });
    successResponse(res)(200, { data: { appointments: rows, total: count } });
  } catch (err) {
    errorResponse(res)(500);
  }
};
