const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const eventRoutes = require('./server/event/event.route');
const emailRoutes = require('./server/email/email.route');
const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount event routes
router.use('/events', eventRoutes);

// mount email routes
router.use('/email', emailRoutes);

module.exports = router;
