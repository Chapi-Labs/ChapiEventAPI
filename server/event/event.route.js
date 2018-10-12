const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const eventCtrl = require('./event.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/events - Get list of events */
  .get(eventCtrl.list)

  /** POST /api/events - Create new user */
  .post(eventCtrl.create);

router.route('/:eventId')
  /** GET /api/events/:userId - Get user */
  .get(eventCtrl.get)


module.exports = router;
