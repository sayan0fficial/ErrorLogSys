const express = require('express');
const { addEventLog, getEventLogs } = require('../controllers/eventLogController');

const router = express.Router();

router.post('/events', addEvent);
router.get('/events', getEvents);

module.exports = router;