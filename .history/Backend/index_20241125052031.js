require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Configs/dbConnection');
const eventLogRoutes = require('./routes/eventLogRoute');

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(
    cors({
        origin: 'http://localhost:3000', // Allow requests from this origin
        methods: ['GET', 'POST'], // Specify allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    })
);

// Parse JSON bodies
app.use(express.json());

// Use routes
app.use('/eventlog', eventLogRoutes);

// Start server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
