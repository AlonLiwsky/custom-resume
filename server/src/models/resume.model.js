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
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Find a formatted experience for a specific user
 * @param {ObjectId} userId - The user id
 * @returns {FormattedExperience}
 */
formattedExperienceSchema.statics.findByUser = async function (userId) {
  const experience = await this.findOne({ userId });
  return experience;
};

// add plugin that converts mongoose to json
formattedExperienceSchema.plugin(toJSON);
formattedExperienceSchema.plugin(paginate);

/**
 * @typedef FormattedExperience
 */
const FormattedExperience = mongoose.model('FormattedExperience', formattedExperienceSchema);

const roleSchema = mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

/**
 * @typedef Role
 */
const Role = mongoose.model('Role', roleSchema);

const resumeSchema = mongoose.Schema(
  {
    roleId: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    templateId: {
      type: String,
      required: true,
      trim: true,
    },
    resume: {
      type: Object,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
resumeSchema.plugin(toJSON);
resumeSchema.plugin(paginate);

/**
 * @typedef Role
 */
const Resume = mongoose.model('Resume', resumeSchema);

module.exports = {
  RawExperience,
  FormattedExperience,
  Role,
  Resume,
};
