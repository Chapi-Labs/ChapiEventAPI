const mongoose = require('mongoose');

/**
 * Email Schema
 */
const EmailValidationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true,
  },
  used: {
    type: Boolean,
    required: true,
    default: false,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
EmailValidationSchema.method({
});

/**
 * Statics
 */
EmailValidationSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(email) {
    return this.findOne({ email })
      .exec()
      .then((email) => {
        if (email) {
          return email;
        }
        return null;
      });
  },


  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef EmailValidation
 */
module.exports = mongoose.model('EmailValidation', EmailValidationSchema);
