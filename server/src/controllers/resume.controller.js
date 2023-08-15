const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { resumeService } = require('../services');

const saveExperience = catchAsync(async (req, res) => {
  const missingFields = await resumeService.saveExperience(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(missingFields);
});

module.exports = {
  saveExperience,
};
