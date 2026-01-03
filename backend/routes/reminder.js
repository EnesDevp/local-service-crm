const express = require('express');
const auth = require('../middleware/auth');
const { sendReminder } = require('../controllers/reminderController');

const router = express.Router();
router.use(auth);

router.post('/send', sendReminder);

module.exports = router;