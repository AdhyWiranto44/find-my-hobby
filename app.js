const express = require("express");
const PORT = 3000;

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {currentDate: new Date().getFullYear()});
})

app.get("/kategori/hobi", (req, res) => {
    res.render("hobi", {currentDate: new Date().getFullYear()});
})

app.get("/s/hobi", (req, res) => {
    res.render("cari-hobi");
})

app.get("/saran-hobi", (req, res) => {
    res.render("saran-hobi");
})


app.listen(PORT, () => {
    "http://localhost:" + PORT
});