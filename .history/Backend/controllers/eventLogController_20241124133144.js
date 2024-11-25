const Event = require('../models/eventModel');
const { computeHash } = require('../\');

// Add Event
const addEvent = async (req, res) => {
  try {
    const { eventType, timestamp, sourceAppId, payload } = req.body;
    const lastEvent = await Event.findOne().sort({ timestamp: -1 });
    const prevHash = lastEvent ? lastEvent.hash : null;

    const newEvent = new Event({
      eventType,
      timestamp: new Date(timestamp),
      sourceAppId,
      payload,
      prevHash,
    });

    newEvent.hash = computeHash(newEvent);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Events with Filters
const getEvents = async (req, res) => {
  try {
    const { eventType, startTime, endTime, sourceAppId } = req.query;
    const filter = {};

    if (eventType) filter.eventType = eventType;
    if (sourceAppId) filter.sourceAppId = sourceAppId;
    if (startTime && endTime) filter.timestamp = { $gte: new Date(startTime), $lte: new Date(endTime) };

    const events = await Event.find(filter).sort({ timestamp: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addEvent, getEvents };