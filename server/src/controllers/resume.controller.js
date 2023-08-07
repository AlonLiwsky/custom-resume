const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { resumeService } = require('../services');

const saveExperience = catchAsync(async (req, res) => {
  const missingFields = await resumeService.saveExperience(req.body);
  res.status(httpStatus.CREATED).send(missingFields);
});

module.exports = {
  saveExperience,
};
