require('dotenv').config();
const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const connectDB = require('./Configs/dbConnection');
const eventLogRoutes = require('./routes/eventLogRoute');
const eventLog = require('./models/eventLogModel');

const app = express();

// Connect to MongoDB
connectDB();

// WebSocket server setup
const wss = new WebSocket.Server({ noServer: true });

// When a WebSocket client connects
wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    // Send the last event log to the new WebSocket client
    eventLog.findOne().sort({ timestamp: -1 }).limit(1).exec((err, lastEvent) => {
        if (lastEvent) {
            ws.send(JSON.stringify(lastEvent)); // Send most recent log
        }
    });

    // Watch the eventLog collection for changes and send updates
    eventLog.watch().on('change', (log) => {
        ws.send(JSON.stringify(log)); // Send new log to WebSocket clients
    });

    // Handle WebSocket close connection
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

// Middleware for CORS
app.use(cors({
    origin: 'http://localhost:3000',  // Make sure this matches your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse JSON requests
app.use(express.json());

// Define Routes
app.use('/eventlog', eventLogRoutes);

// Setup HTTP server to handle WebSocket upgrades
const server = app.listen(process.env.PORT || 80, () => {
    console.log(`Server running on port ${process.env.PORT || 80}`);
});

// Upgrade HTTP server to handle WebSocket connections
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
