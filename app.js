require('dotenv').config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const Connection = require("./src/database/Connection");
const User = require("./src/models/User");
const router = require('./src/routes/api');


PORT = 3000;
app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
app.set("view engine", "ejs");

myConnection = new Connection();
myConnection.connectToMongoDBAtlas();

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(process.env.PORT || PORT, () => {
    console.log("http://localhost:" + PORT);
});