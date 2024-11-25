const mongoose = require('mongoose');

const eventLogsSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sourceAppId: { type: String, required: true },
  payload: { type: Object, required: true },
  hash: { type: String, required: true },
  prevHash: { type: String, re },
});

module.exports = mongoose.model('Event', eventLogsSchema);