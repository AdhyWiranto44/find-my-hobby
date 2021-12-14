const showAlert = require("../helpers/show_alert.js");
const {Category} = require("../models/category.js");
const Hobby = require("../models/hobby.js");
const Suggestion = require("../models/suggestion.js");


exports.index = (req, res) => {
    if (req.isAuthenticated()) {
        Suggestion.find((err, foundSuggestions) => {
            res.render("tampil-saran-hobi", {title: "Tampil Saran Hobi", suggestions: foundSuggestions})
        }).sort({name: 1})
    } else {
        res.redirect("/auth/login")
    }
}

exports.acceptSuggestion = (req, res) => {
    const tambahSaran = req.body.tambahSaran

    Suggestion.findOne({_id: tambahSaran}, (err, foundSuggestion) => {
        if (err) {
            res.redirect("/admin/tampil-saran-hobi")
        } else {
            Hobby.findOne({slug: foundSuggestion.slug}, (err, foundHobby) => {
                if (err) {
                    res.redirect("/admin/tampil-saran-hobi")
                } else {
                    if (foundHobby === null) {
                        const saranHobi = new Hobby({
                            name: foundSuggestion.name,
                            slug: foundSuggestion.slug,
                            description: foundSuggestion.description,
                            category: [{
                                _id: foundSuggestion.category[0]._id,
                                name: foundSuggestion.category[0].name,
                                slug: foundSuggestion.category[0].slug
                            }],
                            img: foundSuggestion.img,
                            visited_count: 0,
                            suggester_email: foundSuggestion.suggester_email,
                            created_at: Date(),
                            updated_at: Date()
                        })
                        saranHobi.save()
                        Suggestion.findByIdAndRemove(foundSuggestion._id, (err) => {
                            if (err) {
                                res.redirect("/admin/tampil-saran-hobi")
                            } else {
                                res.redirect("/admin/tampil-semua-hobi")
                            }
                        })
                    } else {
                        res.redirect("/admin/tampil-saran-hobi")
                    }
                }
            })
        }
    })
}

exports.denySuggestion = (req, res) => {
    const tolakSaran = req.body.tolakSaran

    Suggestion.findByIdAndRemove(tolakSaran, (err) => {
        if (err) {
            res.redirect("/admin/tampil-saran-hobi")
        } else {
            res.redirect("/admin/tampil-saran-hobi")
        }
    })
}

exports.create = (req, res) => {
    Category.find().sort({name: 1}).exec()

    .then(foundCategories => {
        res.render("saran-hobi", {title: "Form Saran Hobi", alert: "", categories: foundCategories})
    })

    .catch(err => {
        console.error(err)
    })
}

exports.store = (req, res) => { // Fungsional paling tidak readable 🤣
    const saranHobi = req.body

    Suggestion.findOne({name: saranHobi.name}, (err, foundSuggestion) => {
        if (err) {
            Category.find((err, foundCategories) => {
                res.render("saran-hobi", {title: "Form Saran Hobi", alert: showAlert("alert-danger", "Saran hobi gagal dikirim, silakan coba beberapa saat lagi."), categories: foundCategories})
            })
        } else {
            if (foundSuggestion === null) {
                Category.findOne({_id: saranHobi.category}, (err, foundCategory) => {
                    if (err) {
                        Category.find((err, foundCategories) => {
                            res.render("saran-hobi", {title: "Form Saran Hobi", alert: showAlert("alert-danger", "Saran hobi gagal dikirim, silakan coba beberapa saat lagi."), categories: foundCategories})
                        })
                    } else {
                        if (foundCategory !== null) {
                            const newSuggestion = new Suggestion({
                                name: saranHobi.name,
                                slug: saranHobi.name.replace(/\s+/g, '-').toLowerCase(),
                                description: saranHobi.description,
                                category: [foundCategory],
                                img: "",
                                visited_count: 0,
                                suggester_email: saranHobi.email,
                                created_at: Date(),
                                updated_at: Date()
                            })
            
                            newSuggestion.save()
                            Category.find((err, foundCategories) => {
                                res.render("saran-hobi", {title: "Form Saran Hobi", alert: showAlert("alert-success", "Saran hobi berhasil kami terima."), categories: foundCategories})
                            })
                        }
                    }
                })
            } else {
                Category.find((err, foundCategories) => {
                    res.render("saran-hobi", {title: "Form Saran Hobi", alert: showAlert("alert-danger", "Sudah pernah ada yang menambahkan saran hobi tersebut! Silakan sarankan hobi yang lain."), categories: foundCategories})
                })
            }
        }
    })
}