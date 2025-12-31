const express = require('express');
const auth = require('../middleware/auth');
const {
    getLeads,
    getLeadById,
    createLead,
    updateLead,
    deleteLead
} = require('../controllers/leadController');

const router = express.Router();


router.use(auth);

router.get('/', getLeads);
router.get('/:id', getLeadById);
router.post('/', createLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;