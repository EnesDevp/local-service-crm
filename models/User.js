const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    businessName: { type: String, required: true },
    phone: String,
    subscription: {
        type: String,
        enum: ['free', 'starter', 'pro'],
        default: 'free'
    },
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});


userSchema.methods.comparePassword = async function (candidate) {
    return await bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);