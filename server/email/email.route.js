const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const emailCtrl = require('./email.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/add')

  /** POST /api/users - Create new email */
  .post(validate(paramValidation.createEmail), emailCtrl.addEmail);

router.route('/token')
  .post(emailCtrl.getToken);

module.exports = router;
