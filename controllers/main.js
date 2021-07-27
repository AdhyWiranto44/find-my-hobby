const Hobby = require("../models/hobby")
const Suggestion = require("../models/suggestion")
const {Category} = require("../models/category")
const { getCurrentYear } = require("../helpers/current-year")

exports.getHomePage = (req, res) => {
    let hobbies = null
    let categories = null

    Hobby.find()
    .limit(5)
    .sort({visited_count: -1})
    .exec()

    .then((foundHobbies) => {
        if (foundHobbies !== null) {
            hobbies = foundHobbies
            return Category.find().exec()
        }
    })

    .then((foundCategories) => {
        categories = foundCategories
        res.render("index", {currentDate: getCurrentYear(), hobbies, categories})
    })

    .catch(err => {
        console.error(err)
    })
}

exports.postSearchPage = (req, res) => {
    res.redirect("/search/" + req.body.search)
}

exports.getDashboardPage = (req, res) => {
    if (req.isAuthenticated()) {
        let hobbies = null
        let suggestions = null

        Hobby.find().exec()

        .then(foundHobbies => {
            hobbies = foundHobbies
            return Suggestion.find().exec()
        })

        .then(foundSuggestions => {
            suggestions = foundSuggestions
            res.render("dashboard", {title: "Dashboard", hobbies_length: hobbies.length, suggestions_length: suggestions.length})
        })

        .catch(err => {
            console.error(err)
        })
        
    } else {
        res.redirect("/auth/login")
    }
}