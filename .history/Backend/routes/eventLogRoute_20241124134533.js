const express = require('express');
const { addEventLog, getEventLogs } = require('../controllers/eventLogController');

const router = express.Router();

router.post('/events', addEventLog);
router.get('/events', getEvents);

module.exports = router;