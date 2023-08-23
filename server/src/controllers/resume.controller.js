const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { resumeService } = require('../services');

const saveExperience = catchAsync(async (req, res) => {
  const missingFields = await resumeService.saveExperience(req.body);
  res.status(httpStatus.CREATED).send(missingFields);
});

const updateExperience = catchAsync(async (req, res) => {
  await resumeService.updateExperience(req.body, req.user.id);
  res.status(httpStatus.OK).send();
});

const saveRole = catchAsync(async (req, res) => {
  const roleId = await resumeService.saveRole(req.body, req.user.id);
  res.status(httpStatus.CREATED).send({role_id: roleId});
});

const createResume = catchAsync(async (req, res) => {
  const resumeFields = await resumeService.createResume(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(resumeFields);
});

module.exports = {
  saveExperience,
  updateExperience,
  saveRole,
  createResume,
};
