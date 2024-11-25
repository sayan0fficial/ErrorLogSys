require('dotenv').config();
const express = require('express');
const connectDB = require('./Configs/');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));