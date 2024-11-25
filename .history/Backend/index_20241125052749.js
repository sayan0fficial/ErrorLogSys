require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Configs/dbConnection');
const eventLogRoutes = require('./routes/eventLogRoute');

const app = express();

connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/eventlog', eventLogRoutes);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
