const { Router } = require("express");
const authRoute = new Router();
const { getUserByEmail, returnUser } = require("../usecases/user");
const { login, logout, signUp, authenticate } = require("../usecases/auth");

authRoute.post("/login", getUserByEmail, login);
authRoute.post("/signup", signUp);
authRoute.get("/logout", logout);
authRoute.get("/me", authenticate, returnUser);

module.exports = authRoute;
