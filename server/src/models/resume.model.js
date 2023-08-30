const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const rawExperienceSchema = mongoose.Schema(
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
rawExperienceSchema.statics.userAlreadyHas = async function (userId) {
  const user = await this.findOne({ userId });
  return !!user;
};

// add plugin that converts mongoose to json
rawExperienceSchema.plugin(toJSON);
rawExperienceSchema.plugin(paginate);

/**
 * @typedef RawExperience
 */
const RawExperience = mongoose.model('RawExperience', rawExperienceSchema);

const formattedExperienceSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fields: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
formattedExperienceSchema.plugin(toJSON);
formattedExperienceSchema.plugin(paginate);

/**
 * @typedef FormattedExperience
 */
const FormattedExperience = mongoose.model('FormattedExperience', formattedExperienceSchema);

module.exports = {
  RawExperience,
  FormattedExperience,
};
