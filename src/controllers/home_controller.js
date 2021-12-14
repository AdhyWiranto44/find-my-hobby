const Hobby = require("../models/hobby");
const {Category} = require("../models/category");


exports.index = (req, res) => {
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
        res.render("index", {currentDate: new Date().getFullYear(), hobbies, categories})
    })

    .catch(err => {
        console.error(err)
    })
}

exports.find = (req, res) => {
    res.redirect("/search/" + req.body.search)
}

exports.findPage = (req, res) => {
    let hobbies = null

    Hobby.find().exec()

    .then(foundHobbies => {
        if (foundHobbies !== null) {
            hobbies = foundHobbies
            res.render("cari-hobi", {currentDate: new Date().getFullYear(), kind: "", hobbies})
        } else {
            res.redirect("/")
        }
    })

    .catch(err => {
        console.error(err)
    })
}

exports.findPageWithSearchTerm = (req, res) => {
    const search = req.params.searchTerm

    Hobby.find({name: {$regex: ".*"+search+".*", $options: 'i'}}).exec()

    .then(foundHobbies => {
        if (foundHobbies !== null) {
            res.render("cari-hobi", {currentDate: new Date().getFullYear(), kind: "mencari", hobbies: foundHobbies, search})
        } else {
            res.redirect("/")
        }
    })

    .catch(err => {
        console.error(err)
    })
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