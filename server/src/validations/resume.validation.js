const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const saveExperience = {
  body: Joi.object()
    .keys({
      experience: Joi.string(),
      userId: Joi.string(),
    })
    .min(1),
};

module.exports = {
  saveExperience,
};
