const _ = require("lodash");
const { Project } = require("../databases/models");
const { errorResponse, successResponse } = require("../helpers/response");

exports.getProjects = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const projects = await Project.findAll({
      where: { userId },
    });
    successResponse(res)(200, { data: projects });
  } catch (err) {
    errorResponse(res)(500);
  }
};

exports.storeProject = async (req, res) => {
  try {
    const { id: userId } = req.user;
    await Project.create({ ...req.body, userId });
    successResponse(res)(201);
  } catch (err) {
    errorResponse(res)(500);
  }
};

exports.getProjectByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findByPk(projectId);
    if (_.isEmpty(project)) {
      return errorResponse(res)(404);
    }
    successResponse(res)(200, { data: project });
  } catch (err) {
    errorResponse(res)(500);
  }
};

exports.updateProjectByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await Project.update(
      { ...req.body },
      { where: { id: projectId } }
    );
    if (!result[0]) {
      return errorResponse(res)(400);
    }
    successResponse(res)(201);
  } catch (err) {
    errorResponse(res)(500);
  }
};

exports.deleteProjectByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await Project.destroy({ where: { id: projectId } });
    if (!result) {
      return errorResponse(res)(400);
    }
    successResponse(res)(201);
  } catch (err) {
    errorResponse(res)(500);
  }
};
