const eventLog = require('../models/eventLogModel');
const { computeHash } = require('../Utils/hashUtil');

// Add Event
const addEventLog = async (req, res) => {
  try {
    const { eventType, timestamp, sourceAppId, payload } = req.body;

    // Validate and parse timestamp
    const parsedTimestamp = new Date(timestamp);
    if (isNaN(parsedTimestamp)) {
      return res.status(400).json({ error: "Invalid date format for timestamp." });
    }

    const lastEvent = await eventLog.findOne().sort({ timestamp: -1 });
    const prevHash = lastEvent ? lastEvent.hash : null;

    const newEventLog = new eventLog({
      eventType,
      timestamp: parsedTimestamp, // Use the validated timestamp
      sourceAppId,
      payload,
      prevHash,
    });

    newEventLog.hash = computeHash(newEventLog);
    await newEventLog.save();
    res.status(201).json(newEventLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Events with Filters
const getEventLogs = async (req, res) => {
  try {
    const { eventType, startTime, endTime, sourceAppId } = req.query;
    const filter = {};

    if (eventType) filter.eventType = eventType;
    if (sourceAppId) filter.sourceAppId = sourceAppId;

    // Parse and validate startTime and endTime
    if (startTime && endTime) {
      const parsedStartTime = new Date(startTime);
      const parsedEndTime = new Date(endTime);

      if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
        return res.status(400).json({ error: "Invalid date format for startTime or endTime." });
      }

      filter.timestamp = { $gte: parsedStartTime, $lte: parsedEndTime };
    }

    const events = await eventLog.find(filter).sort({ timestamp: -1 });

    // Map the events to properly format timestamp and payload
    const formattedEvents = events.map((event) => ({
      ...event.toObject(), // Ensure we're working with a plain object
      timestamp: event.timestamp.toISOString(), // Convert timestamp to string format
      payload: event.payload ? event.payload : {}, // Ensure payload is an object
    }));

    res.json(formattedEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { addEventLog, getEventLogs };