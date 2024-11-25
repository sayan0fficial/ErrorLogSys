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

mongoose.connect("mongodb+srv://sayankumarpal0fficial:sEx7gVeelzCv5Gjj@backend.dnigg.mongodb.net/errorlogs?retryWrites=true&w=majority&appName=backend")
.then(() => {
    console.log("Connected to Database!");
})
.catch(() => {
    console.log("Connection failed")
    err
})

