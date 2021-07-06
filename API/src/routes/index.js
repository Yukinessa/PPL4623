const { Router } = require("express");
const mainRoute = new Router();
const authRoute = require("./auth");
const projectRoute = require("./project");
const appointmentRoute = require("./appointment");
const userRoute = require("./user");

mainRoute.use("/", authRoute);
mainRoute.use("/project", projectRoute);
mainRoute.use("/appointment", appointmentRoute);
mainRoute.use("/user", userRoute);

module.exports = mainRoute;
