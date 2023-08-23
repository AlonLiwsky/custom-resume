const httpStatus = require('http-status');
const { RawExperience, FormattedExperience, Role, Resume } = require('../models');
const OpenAIAdapter = require('../adapters');
const ApiError = require('../utils/ApiError');

/**
 * Save a new experience
 * @param {Object} experienceBody
 * @returns {Promise<Object>}
 */
const saveExperience = async (experienceBody) => {
  // Check if we already saved experience for the user
  if (await RawExperience.RawExperience.userAlreadyHas(experienceBody.userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already has loaded experience');
  }

  // Save the raw experience (the text the user provided as input without any formatting)
  RawExperience.RawExperience.create(experienceBody);

  // Use openAI adapter to extract from the experience the provided list of fields and also the list of the one not present in the experience
  const fields = await OpenAIAdapter.openaiAdapter.extractExperienceFields(experienceBody.experience);

  // Save the formatted experience (the fields that gpt found from the text extracted and saved as JSON format)
  FormattedExperience.FormattedExperience.create({
    fields: fields.foundFields, 
    userId: experienceBody.userId,
  });

  // Return only the missing fields
  return {missing_fields: fields.missingFields};
};

/**
 * Update a experience
 * @param {Object} newExperience
 */
const updateExperience = async (newExperience, userId) => {
  // Check if we already saved experience for the user 
  const experience = await FormattedExperience.FormattedExperience.findByUser(userId);
  if (!experience) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Experience not found for the provided user');
  }

  // Update the formatted experience with the new fields
  experience.fields = { ...experience.fields, ...newExperience.experience };
  await experience.save();
};

/**
 * Save a new role
 * @param {Object} roleBody
 *  * @returns {string}
 */
const saveRole = async (roleBody, userId) => {
   // Check if we already saved experience for the user 
   const experience = await FormattedExperience.FormattedExperience.findByUser(userId);
   if (!experience) {
     throw new ApiError(httpStatus.BAD_REQUEST, 'Experience not found for the provided user');
   }

  // Save the role information
  const role = await Role.Role.create({role: roleBody.role, userId: userId});
  return role.id
};

/**
 * Create a new resume
 * @param {Object} createResumeBody
 * @returns {Object}
 */
const createResume = async (createResumeBody, userId) => {
   // Get formatted experience 
   const experience = await FormattedExperience.FormattedExperience.findByUser(userId);
   if (!experience) {
     throw new ApiError(httpStatus.BAD_REQUEST, 'Experience not found for the provided user');
   }
  
   // Get role information 
   const role = await Role.Role.findById(createResumeBody.roleId);
   if (!role) {
     throw new ApiError(httpStatus.BAD_REQUEST, 'Role not found for the provided role ID');
   }

  // Use openAI adapter generate the fields for the resume according to the experience, role and selected template
  const resumeFields = await OpenAIAdapter.openaiAdapter.generateResume(experience, role, createResumeBody.templateId);

  // Save the generated resume fields
  Resume.Resume.create({
    roleId: createResumeBody.roleId, 
    userId: userId,
    templateId: createResumeBody.templateId,
    resume: resumeFields,
  });

  // Return only the missing fields
  return {resume_fields: resumeFields};
};

module.exports = {
  saveExperience,
  updateExperience,
  saveRole,
  createResume
};
