const express = require('express');
const mongoose = require('mongoose');
const app = express()

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is live on port:", PORT);
});

app.get( '/', (req, res) => {
    res.send("Hello World. updated ");
});

