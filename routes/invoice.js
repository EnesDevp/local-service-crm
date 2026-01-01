const express = require('express');
const auth = require('../middleware/auth');
const { generateInvoice } = require('../controllers/invoiceController');

const router = express.Router();
router.use(auth);

router.post('/generate', generateInvoice);

module.exports = router;