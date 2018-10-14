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

router.route('/add/event')
  /** POST /api/events/:userId - Get user */
  .post(eventCtrl.addEvent)
router.route('/verify/event')
  .post(eventCtrl.verifyEvent);


module.exports = router;
