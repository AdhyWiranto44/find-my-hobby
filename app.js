const express = require('express');
const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send("Find My Hobby");
})

app.listen(PORT, () => {
    "http://localhost:" + PORT
});