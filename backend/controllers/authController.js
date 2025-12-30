// backend/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Kayıt Ol
exports.register = async (req, res) => {
    try {
        const { name, email, password, businessName } = req.body;

        // Email zaten var mı?
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Bu email zaten kayıtlı' });
        }

        // Yeni kullanıcı oluştur
        const user = new User({
            name,
            email,
            password, // pre-save hook hash'leyecek
            businessName
        });

        await user.save();

        // JWT token oluştur
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Kayıt başarılı!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                businessName: user.businessName,
                subscription: user.subscription
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server hatası', error: error.message });
    }
};

// Giriş Yap
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcı var mı?
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email veya şifre yanlış' });
        }

        // Şifre doğru mu?
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email veya şifre yanlış' });
        }

        // Token ver
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Giriş başarılı!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                businessName: user.businessName,
                subscription: user.subscription
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server hatası', error: error.message });
    }
};