const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const { autoIncrement } = require('mongoose-plugin-autoinc');
/**
 * Event Schema
 */
const EventSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: false,
  },
  name: {
    type: String,
    required: true
  },
  day: {
    type: Number,
    required: true,
  },
  hour: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  hour_description: {
    type: String,
    required: false,
  },
  qr: {
    type: Boolean,
    required: true,
    default: false,
  }
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
EventSchema.method({
});

/**
 * Statics
 */
EventSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((event) => {
        if (event) {
          return event;
        }
        const err = new APIError('El usuario no existe!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },


  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50, day = 1 } = {}) {
    return this.find({ day })
      .sort({ hour: 1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef User
 */
EventSchema.plugin(autoIncrement, 'Event');
module.exports = mongoose.model('Event', EventSchema);
