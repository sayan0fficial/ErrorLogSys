const express = require('express');
const { addEventLog, getEventLogs } = require('../controllers/eventLogController');

const router = express.Router();

router.post('/add', addEventLog);
router.get('/', getEventLogs);

module.exports = router;