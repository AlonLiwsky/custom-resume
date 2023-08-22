const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { resumeService } = require('../services');

const saveExperience = catchAsync(async (req, res) => {
  const missingFields = await resumeService.saveExperience(req.body);
  res.status(httpStatus.CREATED).send(missingFields);
});

const updateExperience = catchAsync(async (req, res) => {
  //const missingFields = await resumeService.saveExperience(req.body, req.user.id);
  await resumeService.updateExperience(req.body, req.user.id);
  res.status(httpStatus.OK).send();
});

module.exports = {
  saveExperience,
  updateExperience,
};
