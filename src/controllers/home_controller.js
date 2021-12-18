const Hobby = require("../models/hobby");
const {Category} = require("../models/category");
const [default_categories, default_hobbies, default_suggestions] = require("../helpers/dummy_data");
const Suggestion = require("../models/suggestion");


exports.index = async (req, res) => {
    let hobbies = [];
    let categories = [];

    await Hobby.find().limit(5).sort({visited_count: -1}).exec()
    .then((foundHobbies) => {
        if (foundHobbies.length < 1) {
            insertDefaultCategories();
            insertDefaultHobbies();
            insertDefaultSuggestions();
            return res.redirect("/");
        }
        hobbies = [...foundHobbies];
        return Category.find().exec();
    })
    .then((foundCategories) => {
        categories = [...foundCategories];
    })
    .catch(err => { console.error(err) });
    
    const data = {
        currentDate: new Date().getFullYear(), 
        hobbies: hobbies,
        categories: categories
    }
    res.render("index", data);
}

exports.find = async (req, res) => {
    const search = req.query.title || "";
    let hobbies = [];

    if (search == "") return res.redirect("/");

    await Hobby.find({name: {$regex: ".*"+search+".*", $options: 'i'}}).exec()
    .then(foundHobbies => {
        if (foundHobbies.length > 0) {
            hobbies = [...foundHobbies];
        }
    })
    .catch(() => {
        return res.redirect("/");
    });

    const data = {
        currentDate: new Date().getFullYear(), 
        kind: "mencari", 
        hobbies: hobbies, 
        search: search
    }
    res.render("cari-hobi", data);
}

exports.findRandomHobby = (req, res) => {
    Hobby.aggregate([{$sample: {size: 1}}]).exec()

    .then(foundHobby => {
        const recommendedHobby = foundHobby[0].slug
        const hobbyCategory = foundHobby[0].category[0].slug
        res.redirect(`/hobby/${hobbyCategory}/${recommendedHobby}`)
    })

    .catch(err => {
        console.error(err)
    })
}

function insertDefaultCategories() {
    Category.insertMany(default_categories, (err) => {});
}
function insertDefaultHobbies() {
    Hobby.insertMany(default_hobbies, (err) => {});
}
function insertDefaultSuggestions() {
    Suggestion.insertMany(default_suggestions, (err) => {});
}