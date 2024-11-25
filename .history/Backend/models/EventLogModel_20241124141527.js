const mongoose = require('mongoose');

const eventLogsSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sourceAppId: { type: String, required: true },
  payload: { type: Object, required: false },
  hash: { type: String, required: false },
  prevHash: { type: String },
});

module.exports = mongoose.model('Event', eventLogsSchema);