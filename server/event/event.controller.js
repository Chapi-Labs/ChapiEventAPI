const Event = require('./event.model');


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
    order: req.body.order,
    description: req.body.description,
    hour_description: req.body.hour_description
  });
  event.save()
  .then(savedEvent => res.json(savedEvent))
  .catch(e => next(e));

}


/**
 * Get event list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Event[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Event.list({ limit, skip })
    .then(events => res.json(events))
    .catch(e => next(e));
}

module.exports = { get, create, list };
