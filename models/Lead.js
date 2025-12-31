const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    serviceType: {
        type: String,
        enum: ['Plumbing', 'Electrical', 'Cleaning', 'HVAC', 'Other'],
        default: 'Other'
    },
    address: String,
    notes: String,
    status: {
        type: String,
        enum: ['New', 'Quoted', 'Scheduled', 'Completed', 'Paid'],
        default: 'New'
    },
    quoteAmount: Number,
    createdAt: { type: Date, default: Date.now },
    nextReminder: Date
});

module.exports = mongoose.model('Lead', leadSchema);