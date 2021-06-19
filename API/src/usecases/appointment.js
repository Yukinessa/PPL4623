const _ = require("lodash");
const { Appointment, Project } = require("../databases/models");
const { errorResponse, successResponse } = require("../helpers/response");

exports.getAppointments = async (req, res) => {
  try {
    const { publisherId, designerId, status } = req.query;
    const publisherQuery = !_.isEmpty(publisherId) ? { publisherId } : {};
    const designerQuery = !_.isEmpty(designerId) ? { designerId } : {};
    const statusQuery = !_.isEmpty(status) ? { status } : {};
    const appointments = await Appointment.findAll({
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
      include: [
        {
          model: Project,
          as: "project",
          required: false,
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
    const { projectId, meetDate, activity, location } = req.body;
    const result = await Appointment.update(
      { projectId, meetDate, activity, location },
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
    if (appointment.publisherId !== userId) {
      return errorResponse(res)(403);
    }
    appointment.status = status;
    await appointment.save();
    successResponse(res)(201);
  } catch (err) {
    errorResponse(res)(500);
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
