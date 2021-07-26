const express = require('express')
const passport = require("passport")
const router = express.Router()

const showAlert = require("../helpers/showAlert.js");
const {Category} = require("../models/Category.js")
const Hobby = require("../models/Hobby.js")
const Suggestion = require("../models/Suggestion.js")
const User = require("../models/User.js")

router.get("/", (req, res) => {
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
})

router.post("/", (req, res) => {
    res.redirect("/search/" + req.body.search)
})

router.get("/category/:categorySlug", (req, res) => {
    const categorySlug = req.params.categorySlug
    let category = null
    let hobbies = null

    Category.findOne({slug: categorySlug}).exec()

    .then((foundCategory) => {
        if (foundCategory !== null) {
            category = foundCategory
            return Hobby.find({"category._id": category._id}).exec()
        } else {
            res.redirect("/")
        }
    })

    .then((foundHobbies) => {
        if (foundHobbies !== null && foundHobbies.length > 0) {
            hobbies = foundHobbies
            res.render("cari-hobi", {currentDate: new Date().getFullYear(), kind: "kategori", hobbies})
        } else {
            res.redirect("/")
        }
    })

    .catch(err => {
        console.error(err)
    })
})

router.get("/hobby/:categorySlug/:hobbySlug", (req, res, next) => {
    const categorySlug = req.params.categorySlug
    const hobbySlug = req.params.hobbySlug
    let category = null
    let hobby = null

    Category.findOne({slug: categorySlug}).exec()

    .then((foundCategory) => { // cari kategori
        if (foundCategory !== null) {
            category = foundCategory
            return Hobby.findOne({slug: hobbySlug, "category._id": category._id}).exec()
        } else {
            res.redirect("/")
        }
    })

    .then((foundHobby) => { // cari hobi
        hobby = foundHobby
        let visited_count = hobby.visited_count
        visited_count++
        return Hobby.findOneAndUpdate({slug: hobby.slug}, {visited_count}).exec()
    })

    .then(() => { // updated views hobi yang dicari
        res.render("hobi", {currentDate: new Date().getFullYear(), hobby})
    })

    .catch(err => {
        console.error(err)
    })
})

router.get("/search/", (req, res) => {
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
})

router.get("/search/:searchTerm", (req, res) => {
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
})

router.get("/carikan-saya-hobi", (req, res) => {
    Hobby.aggregate([{$sample: {size: 1}}]).exec()

    .then(foundHobby => {
        const recommendedHobby = foundHobby[0].slug
        const hobbyCategory = foundHobby[0].category[0].slug
        res.redirect(`/hobby/${hobbyCategory}/${recommendedHobby}`)
    })

    .catch(err => {
        console.error(err)
    })
})

router.get("/auth/login", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/admin/dashboard")
    } else {
        User.findOne().exec()

        .then((foundUser) => {
            if (foundUser === null) {
                User.register({username: "admin"}, "MinaIsMine!44")
            }
            res.render("login", {currentDate: new Date().getFullYear()})
        })

        .catch(err => {
            console.error(err)
        })
    }
})

router.post("/auth/login", (req, res) => {
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
})

router.get("/auth/logout", (req, res) => {
    try {
        req.logout()
        res.redirect("/auth/login")
    } catch (err) {
        console.error(err)
    }
})

router.get("/admin/dashboard", (req, res, next) => {
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
})

router.get("/admin/tampil-semua-hobi", (req, res) => {
    if (req.isAuthenticated()) {
        Hobby.find().sort({created_at: -1}).exec()

        .then(foundHobbies => {
            res.render("tampil-semua-hobi", {title: "Tampil Semua Hobi", hobbies: foundHobbies})
        })

        .catch(err => {
            console.error(err)
        })
    } else {
        res.redirect("/auth/login")
    }
})

router.post("/admin/tampil-semua-hobi", (req, res) => {
    const search = req.body.search

    if (search !== "") {
        Hobby.find({name: {$regex: ".*"+search+".*", $options: 'i'}}).exec()

        .then(foundHobbies => {
            res.render("tampil-semua-hobi", {title: "Tampil Semua Hobi", hobbies: foundHobbies})
        })

        .catch(err => {
            console.error(err)
        })
    } else {
        res.redirect("/admin/tampil-semua-hobi")
    }
})

router.get("/admin/tambah-hobi-baru", (req, res) => {
    if (req.isAuthenticated()) {
        Category.find().sort({name: 1}).exec()

        .then(foundCategories => {
            res.render("tambah-hobi-baru", {title: "Tambah Hobi Baru", alert: "", hobby: "", categories: foundCategories})
        })

        .catch(err => {
            console.error(err)
        })
    } else {
        res.redirect("/auth/login")
    }
})

router.post("/admin/tambah-hobi-baru", (req, res) => {
    const hobiBaru = req.body

    Category.findOne({_id: hobiBaru.category}).exec()

    .then(foundCategory => {
        if (foundCategory !== null) {
            const newHobby = new Hobby({
                name: hobiBaru.name,
                slug: hobiBaru.name.replace(/\s+/g, '-').toLowerCase(),
                description: hobiBaru.description,
                category: [foundCategory],
                img: "",
                visited_count: 0,
                created_at: Date(),
                updated_at: Date()
            })

            newHobby.save()
            res.redirect("/admin/tampil-semua-hobi")
        } else {
            res.redirect("/admin/tambah-hobi-baru")
        }
    })

    .catch(err => {
        console.error(err)
    })
})

router.post("/admin/menghapus-hobi", (req, res) => {
    const hapusHobi = req.body.hapusHobi

    Hobby.findByIdAndRemove({_id: hapusHobi}, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/admin/tampil-semua-hobi")
        }
    })
})

router.get("/admin/mengubah-hobi/:slug", (req, res) => {
    if (req.isAuthenticated()) {
        const slugHobi = req.params.slug

        Hobby.findOne({slug: slugHobi}, (err, foundHobby) => {
            if (foundHobby !== null) {
                Category.find((err, foundCategory) => {
                    res.render("tambah-hobi-baru", {title: "Mengubah Hobi", hobby: foundHobby, categories: foundCategory, alert: ""})
                }).sort({name: 1})
            } else {
                res.redirect("/admin/tampil-semua-hobi")
            }
        })
    } else {
        res.redirect("/auth/login")
    }
})

router.post("/admin/mengubah-hobi", (req, res, next) => {
    const hobi = req.body

    Category.findOne({_id: hobi.category}).exec()

    .then(foundCategory => {
        if (foundCategory !== null) {
            const hobiTerubah = {
                name: hobi.name,
                description: hobi.description,
                category: [foundCategory],
                img: "",
                updated_at: Date()
            }

            return Hobby.findByIdAndUpdate(hobi.id_hobi, hobiTerubah).exec()
        }
    })

    .then(() => {
        res.redirect("/admin/tampil-semua-hobi")
    })

    .catch(err => {
        console.error(err)
    })
})

router.get("/admin/tambah-kategori", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("tambah-kategori", {title: "Tambah Kategori", alert: "", category: ""})
    } else {
        res.redirect("/auth/login")
    }
})

router.post("/admin/tambah-kategori", (req, res) => {
    const kategoriBaru = req.body

    Category.findOne({name: kategoriBaru.name}, (err, foundCategory) => {
        if (err) {
            res.redirect("/admin/tambah-kategori")
        } else {
            if (foundCategory === null) {
                const newCategory = new Category({
                    name: kategoriBaru.name,
                    slug: kategoriBaru.name.replace(/\s+/g, '-').toLowerCase()
                })

                newCategory.save()
                res.redirect("/admin/tampil-kategori")
            } else {
                res.redirect("/admin/tambah-kategori")
            }
        }
    })
})

router.get("/admin/tampil-kategori", (req, res) => {
    if (req.isAuthenticated()) {
        Category.find((err, foundCategories) => {
            if (err) {
                res.redirect("/admin/dashboard")
            } else {
                if (foundCategories !== null) {
                    res.render("tampil-kategori", {title: "Tampil Kategori", alert: "", categories: foundCategories})
                } else {
                    res.redirect("/admin/dashboard")
                }
            }
        }).sort({name: 1})
    } else {
        res.redirect("/auth/login")
    }
})

router.post("/admin/tampil-kategori", (req, res) => {
    const search = req.body.search

    if (search !== "") {
        Category.find({name: {$regex: ".*"+search+".*", $options: 'i'}}, (err, foundCategories) => {
            res.render("tampil-kategori", {title: "Tampil Kategori", categories: foundCategories})
        })
    } else {
        res.redirect("/admin/tampil-kategori")
    }
})

router.post("/admin/menghapus-kategori", (req, res) => {
    const hapusKategori = req.body.hapusKategori

    Category.findByIdAndRemove({_id: hapusKategori}, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/admin/tampil-kategori")
        }
    })
})

router.get("/admin/mengubah-kategori/:slug", (req, res) => {
    if (req.isAuthenticated()) {
        const slugKategori = req.params.slug
        Category.findOne({slug: slugKategori}, (err, foundCategory) => {
            if (foundCategory !== null) {
                res.render("tambah-kategori", {title: "Mengubah Kategori", category: foundCategory, alert: ""})
            } else {
                res.redirect("/admin/tampil-kategori")
            }
        })
    } else {
        res.redirect("/auth/login")
    }
})

router.post("/admin/mengubah-kategori", (req, res) => {
    const kategori = req.body
    
    Category.findByIdAndUpdate(kategori.id_kategori, {name: kategori.name}, (err) => {
        res.redirect("/admin/tampil-kategori")
    })
})

router.get("/admin/tampil-saran-hobi", (req, res) => {
    if (req.isAuthenticated()) {
        Suggestion.find((err, foundSuggestions) => {
            res.render("tampil-saran-hobi", {title: "Tampil Saran Hobi", suggestions: foundSuggestions})
        }).sort({name: 1})
    } else {
        res.redirect("/auth/login")
    }
})

router.post("/admin/menerima-saran-hobi", (req, res) => {
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
})

router.post("/admin/menolak-saran-hobi", (req, res) => {
    const tolakSaran = req.body.tolakSaran

    Suggestion.findByIdAndRemove(tolakSaran, (err) => {
        if (err) {
            res.redirect("/admin/tampil-saran-hobi")
        } else {
            res.redirect("/admin/tampil-saran-hobi")
        }
    })
})

router.get("/saran-hobi", (req, res) => {
    Category.find().sort({name: 1}).exec()

    .then(foundCategories => {
        res.render("saran-hobi", {title: "Form Saran Hobi", alert: "", categories: foundCategories})
    })

    .catch(err => {
        console.error(err)
    })
})

router.post("/saran-hobi", (req, res) => { // Fungsional paling tidak readable 🤣
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
})

module.exports = router