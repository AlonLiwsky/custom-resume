const httpStatus = require('http-status');
const { Experience } = require('../models');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

/**
 * Save a new experience
 * @param {Object} experienceBody
 * @returns {Promise<MissingFields>}
 */
const saveExperience = async (experienceBody) => {
  if (await Experience.userAlreadyHas(experienceBody.userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already has loaded experience');
  }

  logger.info(Experience.create(experienceBody))

  //TODO: Connect to OpenAI adapter to send experience and obtain missing fields
  
  return MissingFields;
};

module.exports = {
  saveExperience,
};
