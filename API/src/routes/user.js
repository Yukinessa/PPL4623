const { Router } = require("express");
const { getUsers } = require("../usecases/user");
const userRoute = new Router();

userRoute.get("/", getUsers);

module.exports = userRoute;
