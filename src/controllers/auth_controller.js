const passport = require("passport");
const User = require("../models/User.js");


exports.index = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/admin/dashboard");
    }

    User.findOne().exec()
    .then((foundUser) => {
        if (foundUser === null) {
            User.register({username: "admin"}, "12345");
            res.redirect("/auth/login");
        }
    })
    .catch(err => {
        console.error(err);
        res.redirect("/");
    });

    res.render("login", {currentDate: new Date().getFullYear()});
}

exports.login = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.findOne({username: user.username}).exec()
    .then((foundUser) => {
        if (foundUser !== null) {
            req.login(user, (err) => {
                passport.authenticate('local')(req, res, function() {
                    return res.redirect('/admin/dashboard');
                })
            });
        }
    })
    .catch(err => {
        console.error(err);
    });
}

exports.logout = (req, res) => {
    try {
        req.logout();
        res.redirect("/auth/login");
    } catch (err) {
        console.error(err);
        res.redirect("/");
    }
}