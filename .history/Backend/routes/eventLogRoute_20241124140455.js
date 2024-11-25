const express = require('express');
const { addEventLog, getEventLogs } = require('../controllers/eventLogController');

const router = express.Router();

router.post('/add', addEventLog);
router.get('/fetch', getEventLogs);

module.exports = router;