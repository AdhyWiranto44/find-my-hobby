const passport = require("passport")
const User = require("../models/user")
const { getCurrentYear } = require("../helpers/current-year")

exports.getLoginPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/admin/dashboard")
    } else {
        User.findOne().exec()

        .then((foundUser) => {
            if (foundUser === null) {
                User.register({username: "admin"}, "MinaIsMine!44")
            }
            res.render("login", {currentDate: getCurrentYear()})
        })

        .catch(err => {
            console.error(err)
        })
    }
}

exports.login = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    User.findOne({username: user.username}).exec()

    .then((foundUser) => {
        if (foundUser !== null) {
            req.login(user, (err) => {
                passport.authenticate('local')(req, res, function() {
                    res.redirect('/admin/dashboard')
                })
            })
        }
    })

    .catch(err => {
        console.error(err)
    })
}

exports.logout = (req, res) => {
    try {
        req.logout()
        res.redirect("/auth/login")
    } catch (err) {
        console.error(err)
    }
}