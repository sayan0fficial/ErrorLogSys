const express = require('express');
const { addEvent, getEvents } = require('../');

const router = express.Router();

router.post('/events', addEvent);
router.get('/events', getEvents);

module.exports = router;