const Hobby = require("../models/hobby");
const Suggestion = require("../models/suggestion");


exports.index = (req, res) => {
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