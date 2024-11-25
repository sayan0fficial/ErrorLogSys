const express = require('express');
const mongoose = require('mongoose');
const app = express()

const PORT = 80;
mongoose.connect("mongodb+srv://sayankumarpal0fficial:sEx7gVeelzCv5Gjj@backend.dnigg.mongodb.net/errorlogs?retryWrites=true&w=majority&appName=backend")
.then(() => {
    console.log("Connected to Database!");
    app.listen(PORT, () => {
        console.log("Server is live on port:",PORT);
    });
})
.catch(() => {
    console.log("Connection failed")
    console.error("Error details:" mongoose.Error)
})

app.get( '/', (req, res) => {
    res.send("Hello World. updated ");
});

