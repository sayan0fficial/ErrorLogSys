const crypto = require('crypto');

const computeHash = (event) => {
  const data = `${event.eventType}${event.timestamp}${event.sourceAppId}${JSON.stringify(event.payload)}${event.prevHash}`;
  return crypto.createHash('sha256').update(data).digest('hex');
};

module.exports = { computeHash };