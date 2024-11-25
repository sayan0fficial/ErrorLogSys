const express = require('express');
const { addEventLog, getEventLogs } = require('../controllers/eventLogController');

const router = express.Router();

router.post('/eventlogs', addEventLog);
router.get('/events', getEventLogs);

module.exports = router;