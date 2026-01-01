const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const Lead = require('../models/Lead');

exports.sendReminder = async (req, res) => {
    try {
        const { leadId, customMessage } = req.body;
        const lead = await Lead.findOne({ _id: leadId, userId: req.user._id });
        if (!lead) return res.status(404).json({ message: 'Lead not found' });

        const message = customMessage || `Hi ${lead.name}, your appointment is tomorrow. Thank you! - ${req.user.businessName}`;

        const sent = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE,
            to: lead.phone
        });

        res.json({ message: 'SMS sent successfully!', sid: sent.sid });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send SMS', error: error.message });
    }
};