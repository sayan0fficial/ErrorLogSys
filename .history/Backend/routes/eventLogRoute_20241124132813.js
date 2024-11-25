const express = require('express');
const { addEvent, getEvents } = require('../controllers/eventController');

const router = express.Router();

router.post('/events', addEvent);
router.get('/events', getEvents);

module.exports = router;