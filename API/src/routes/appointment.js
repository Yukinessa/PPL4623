const { Router } = require("express");
const appointmentRoute = new Router();
const { authenticate, authorization } = require("../usecases/auth");
const { USER_ROLE } = require("../constants/user");
const {
  getAppointments,
  storeAppointment,
  getAppointmentByAppointmentId,
  updateAppointmentByAppointmentId,
  updateStatusAppointmentByAppointmentId,
  deleteAppointmentByAppointmentId,
  getAppointmentToday,
} = require("../usecases/appointment");

appointmentRoute.get("/", authenticate, getAppointments);
appointmentRoute.get("/today", authenticate, getAppointmentToday);
appointmentRoute.post(
  "/",
  authenticate,
  authorization([USER_ROLE.DESIGNER]),
  storeAppointment
);
appointmentRoute.get(
  "/:appointmentId",
  authenticate,
  getAppointmentByAppointmentId
);
appointmentRoute.put(
  "/:appointmentId",
  authenticate,
  authorization([USER_ROLE.DESIGNER]),
  updateAppointmentByAppointmentId
);
appointmentRoute.patch(
  "/:appointmentId",
  authenticate,
  authorization([USER_ROLE.PUBLISHER, USER_ROLE.DESIGNER]),
  updateStatusAppointmentByAppointmentId
);
appointmentRoute.delete(
  "/:appointmentId",
  authenticate,
  authorization([USER_ROLE.DESIGNER]),
  deleteAppointmentByAppointmentId
);

module.exports = appointmentRoute;
