const express = require('express');
const { addEventLog, getEventLogs } = require('../controllers/eventLogController');

const router = express.Router();

router.post('/eventlog', addEventLog);
router.get('/eventlogs', getEventLogs);

module.exports = router;