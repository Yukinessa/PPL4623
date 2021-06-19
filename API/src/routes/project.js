const { Router } = require("express");
const projectRoute = new Router();
const { authenticate } = require("../usecases/auth");
const {
  getProjects,
  storeProject,
  getProjectByProjectId,
  updateProjectByProjectId,
  deleteProjectByProjectId,
} = require("../usecases/project");

projectRoute.get("/", authenticate, getProjects);
projectRoute.post("/", authenticate, storeProject);
projectRoute.get("/:projectId", authenticate, getProjectByProjectId);
projectRoute.put("/:projectId", authenticate, updateProjectByProjectId);
projectRoute.delete("/:projectId", authenticate, deleteProjectByProjectId);

module.exports = projectRoute;
