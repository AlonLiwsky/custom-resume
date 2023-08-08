const httpStatus = require('http-status');
const { Experience } = require('../models');
const OpenAIAdapter = require('../adapters');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

/**
 * Save a new experience
 * @param {Object} experienceBody
 * @returns {Promise<Object>}
 */
const saveExperience = async (experienceBody) => {
  if (await Experience.userAlreadyHas(experienceBody.userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already has loaded experience');
  }

  const createdExperience = await Experience.create(experienceBody);
  logger.info('Created experience:', createdExperience);
  
  //Should receive found and missing fields, save the found fields and return the missing ones
  const fields = OpenAIAdapter.openaiAdapter.extractExperienceFields(experienceBody.experience, [1,2]);

  return (await fields).missingFields
};

module.exports = {
  saveExperience,
};
