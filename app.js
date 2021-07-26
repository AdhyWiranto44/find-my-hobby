require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const User = require("./models/User.js");
const PORT = 3000;

// Express
const app = express();

// Use
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", require('./router/api'))

// Set Modules
app.set("view engine", "ejs");

// Cloud MongoDB
// mongoose.connect(`mongodb+srv://find-my-hobby-admin:${process.env.DB_PASSWORD}@cluster0.k9fdy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

// Local MongoDB
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set("useCreateIndex", true);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(process.env.PORT || PORT, () => {
    console.log("http://localhost:" + PORT)
});