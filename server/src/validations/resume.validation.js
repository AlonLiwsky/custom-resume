const Joi = require('joi');

const saveExperience = {
  body: Joi.object()
    .keys({
      experience: Joi.string(),
    })
    .min(1),
};

module.exports = {
  saveExperience,
};
