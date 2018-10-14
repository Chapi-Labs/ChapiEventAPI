const Event = require('./event.model');
const User = require('../user/user.model');

/**
 * Get user
 * @returns {Event}
 */
async function get(req, res) {
  const event = await Event.findById(req.params.eventId);
  res.json(event);
}

/**
 * Create new event
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
async function create(req, res, next) {
  const event = new Event({
    name: req.body.name,
    description: req.body.description,
    hour: req.body.hour,
    hour_description: req.body.hour_description,
    day: req.body.day,
    qr: req.body.qr
  });
  event.save()
  .then(savedEvent => res.json(savedEvent))
  .catch(e => next(e));

}


async function addEvent(req, res) {
  try {
    const [event, user] = await Promise.all([
      Event.get(req.body.id),
      User.findOne({ email: req.body.email})
    ]);
    user.events_attended.push(event);
    await user.save();
    res.json({ valid: true});
  } catch (error) {
    res.json({ valid: false });
  }
}

async function verifyEvent(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    const index = user.events_attended.findIndex(event => event._id === req.body.event_id);
    const valid = index === -1;
    if (valid) {
       const event = await Event.get(req.body.event_id);
       user.events_attended.push(event);
       await user.save();
       return res.json({ valid: true });
    }
    res.json({ valid });
  } catch (error) {
    res.json({ valid: false, error: 'error verificando' });
  }
}

/**
 * Get event list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Event[]}
 */
async function list(req, res, next) {
  const { limit = 50, skip = 0, day = 1 } = req.query;
  try {
    const events = await Event.list({limit, skip, day });
    const map = new Map();
    events.forEach((event) => {
      const entry = map.get(event.hour_description);
      if (!entry) {
        map.set(event.hour_description, [event]);
      } else {
        entry.push(event);
      }
    });
    const result = [];
    map.forEach((value, key) => {
      result.push({
        events: value,
        hour: key,
      });
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { get, create, list, addEvent, verifyEvent };
