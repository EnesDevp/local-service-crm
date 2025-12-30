const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// Routes bölümüne ekle
app.use('/api/auth', require('./routes/auth'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(' MongoDb Error:', err));

app.get('/', (req, res) => {
    res.json({
        message: 'Local Service CRM API Is Working!',
        version: '1.0.0'
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is working on http://localhost:${PORT} `);
});