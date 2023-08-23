const Joi = require('joi');

const saveExperience = {
  body: Joi.object()
    .keys({
      experience: Joi.string(),
      userId: Joi.string(),
    })
    .min(1),
};

const updateExperience = {
  body: Joi.object()
    .keys({
      experience: Joi.object(),
    })
    .min(1),
};

const saveRole = {
  body: Joi.object()
    .keys({
      role: Joi.string(),
    })
    .min(1),
};

const createResume = {
  body: Joi.object()
  .keys({
    roleId: Joi.string(),
    templateId: Joi.string(),
  })
    .min(1),
};

module.exports = {
  saveExperience,
  updateExperience,
  saveRole,
  createResume,
};
