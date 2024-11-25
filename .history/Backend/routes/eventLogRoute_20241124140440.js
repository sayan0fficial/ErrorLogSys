const express = require('express');
const { addEventLog, getEventLogs } = require('../controllers/eventLogController');

const router = express.Router();

router.post('', addEventLog);
router.get('/eventlog', getEventLogs);

module.exports = router;