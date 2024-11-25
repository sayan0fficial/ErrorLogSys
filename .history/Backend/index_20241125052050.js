require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Configs/dbConnection');
const eventLogRoutes = require('./routes/eventLogRoute');

const app = express();

connectDB();

app.use(
    cors({
        origin: 'http://localhost:3000', // Allow requests from this origin
        methods: ['GET', 'POST'], // Specify allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    })
);

app.use(express.json());

app.use('/eventlog', eventLogRoutes);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
