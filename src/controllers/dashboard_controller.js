const Hobby = require("../models/Hobby.js");
const Suggestion = require("../models/Suggestion.js");


exports.index = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/auth/login");
    }
    
    let hobbies = [];
    let suggestions = [];

    await Hobby.find().exec()
    .then(foundHobbies => {
        hobbies = [...foundHobbies];
    })
    .catch(err => {
        console.error(err);
    });
    
    await Suggestion.find().exec()
    .then(foundSuggestions => {
        suggestions = [...foundSuggestions];
    })
    .catch(err => {
        console.error(err);
    });

    const data = {
        title: "Dashboard", 
        hobbies_length: hobbies.length, 
        suggestions_length: suggestions.length
    }
    res.render("dashboard", data);
}