const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string()
        .regex(/^([\w-.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})$/)
        .required(),
    },
  },
  createEmail: {
    body: {
      email: Joi.string()
        .regex(/^([\w-.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})$/)
        .required(),
    },
  },
  createEvent: {
    body: {
      name: Joi.string().required(),
      day: Joi.number().required(),
      hour: Joi.number().required(),
      description: Joi.string(),
      hour_description: Joi.string().required(),
      qr: Joi.boolean()
    },
  },
  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string()
        .regex(/^[1-9][0-9]{9}$/)
        .required()
    },
    params: {
      userId: Joi.string()
        .hex()
        .required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required(),
    }
  }
};
