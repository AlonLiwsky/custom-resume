const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const experienceSchema = mongoose.Schema(
  {
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Check if there is an experience for a specific user
 * @param {ObjectId} userId - The user's id
 * @returns {Promise<boolean>}
 */
experienceSchema.statics.userAlreadyHas = async function (userId) {
  const user = await this.findOne({ userId });
  return !!user;
};

const missingFields =  mongoose.Schema({
  missingFields: [Number]
});

// add plugin that converts mongoose to json
experienceSchema.plugin(toJSON);
experienceSchema.plugin(paginate);

/**
 * @typedef Experience
 */
const Experience = mongoose.model('Experience', experienceSchema);

/**
 * @typedef MissingFields
 */
const MissingFields = mongoose.model('MissingFields', missingFields);

//module.exports = {Experience, MissingFields};
module.exports = Experience;
