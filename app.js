const express = require("express");
const PORT = 3000;

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {currentDate: new Date().getFullYear()});
})

app.listen(PORT, () => {
    "http://localhost:" + PORT
});