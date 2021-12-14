const Hobby = require("../models/Hobby");
const {Category} = require("../models/Category");


exports.index = (req, res) => {
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
}

exports.show = (req, res, next) => {
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
}

exports.edit = (req, res) => {
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
}

exports.update = (req, res, next) => {
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
}

exports.find = (req, res) => {
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
}

exports.create = (req, res) => {
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
}

exports.store = (req, res) => {
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
}

exports.destroy = (req, res) => {
    const hapusHobi = req.body.hapusHobi

    Hobby.findByIdAndRemove({_id: hapusHobi}, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/admin/tampil-semua-hobi")
        }
    })
}