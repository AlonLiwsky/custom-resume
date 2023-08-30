const httpStatus = require('http-status');
const { RawExperience, FormattedExperience } = require('../models');
const OpenAIAdapter = require('../adapters');
const ApiError = require('../utils/ApiError');

/**
 * Save a new experience
 * @param {Object} experienceBody
 * @returns {Promise<Object>}
 */
const saveExperience = async (experienceBody, userId) => {
  // Check if we already saved experience for the user
  if (await RawExperience.RawExperience.userAlreadyHas(userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already has loaded experience');
  }

  // Save the raw experience (the text the user provided as input without any formatting)
  RawExperience.RawExperience.create({
    experience: experienceBody.experience,
    userId,
  });

  // Use openAI adapter to extract from the experience the provided list of fields and also the list of the one not present in the experience
  const fields = await OpenAIAdapter.openaiAdapter.extractExperienceFields(experienceBody.experience, [1,2]);

  // Save the formatted experience (the fields that gpt found from the text extracted and saved as JSON format)
  FormattedExperience.FormattedExperience.create({
    fields: fields.foundFields, 
    userId: userId,
  });

  // Return only the missing fields
  return {missing_fields: fields.missingFields};
};

module.exports = {
  saveExperience,
};
