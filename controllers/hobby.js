const Hobby = require("../models/hobby")
const { Category } = require("../models/category")
const { getCurrentYear } = require("../helpers/current-year")

exports.getHobbyByCategory = (req, res) => {
    const categorySlug = {"slug": req.params.categorySlug}
    let categoryId = null
    let hobbies = null

    Category.findOne(categorySlug).exec()
    .then((foundCategory) => {
        if (foundCategory !== null) {
            categoryId = foundCategory._id
            return Hobby.find({"category._id": categoryId}).exec()
        } else {
            res.redirect("/")
        }
    })
    .then((foundHobbies) => {
        if (foundHobbies !== null && foundHobbies.length > 0) {
            hobbies = foundHobbies
            res.render("cari-hobi", {"kind": "kategori", hobbies})
        } else {
            res.redirect("/")
        }
    })
    .catch(err => {
        console.error(err)
    })
}

exports.getHobby = (req, res) => {
    const categorySlug = {"slug": req.params.categorySlug}
    const hobbySlug = req.params.hobbySlug
    let categoryId = null
    let hobby = null

    Category.findOne(categorySlug).exec()
    .then((foundCategory) => { // cari kategori
        if (foundCategory !== null) {
            categoryId = foundCategory._id
            const filter = {
                "slug": hobbySlug, 
                "category._id": categoryId
            }
            return Hobby.findOne(filter).exec()
        } else {
            res.redirect("/")
        }
    })
    .then((foundHobby) => { // cari hobi
        hobby = foundHobby
        let visited_count = hobby.visited_count
        return Hobby.findOneAndUpdate({"slug": hobby.slug}, {"visited_count": ++visited_count}).exec()
    })
    .then(() => { // updated views hobi yang dicari
        res.render("hobi", {currentDate: getCurrentYear(), hobby})
    })
    .catch(err => {
        console.error(err)
    })
}

exports.getSearchPage = (req, res) => {
    let hobbies = null

    Hobby.find().exec()

    .then(foundHobbies => {
        if (foundHobbies !== null) {
            hobbies = foundHobbies
            res.render("cari-hobi", {currentDate: getCurrentYear(), kind: "", hobbies})
        } else {
            res.redirect("/")
        }
    })

    .catch(err => {
        console.error(err)
    })
}

exports.getFoundHobby = (req, res) => {
    const search = req.params.searchTerm

    Hobby.find({name: {$regex: ".*"+search+".*", $options: 'i'}}).exec()

    .then(foundHobbies => {
        if (foundHobbies !== null) {
            res.render("cari-hobi", {currentDate: getCurrentYear(), kind: "mencari", hobbies: foundHobbies, search})
        } else {
            res.redirect("/")
        }
    })

    .catch(err => {
        console.error(err)
    })
}

exports.getRandomHobby = (req, res) => {
    Hobby.aggregate([{$sample: {size: 1}}]).exec()

    .then(foundHobby => {
        const randomHobby = foundHobby[0].slug
        const hobbyCategory = foundHobby[0].category[0].slug
        res.redirect(`/hobby/${hobbyCategory}/${randomHobby}`)
    })

    .catch(err => {
        console.error(err)
    })
}

exports.getAllHobby = (req, res) => {
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

exports.postAllHobby = (req, res) => {
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

exports.getAddHobby = (req, res) => {
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

exports.postAddHobby = (req, res) => {
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

exports.postRemoveHobby = (req, res) => {
    const hapusHobi = req.body.hapusHobi

    Hobby.findByIdAndRemove({_id: hapusHobi}, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/admin/tampil-semua-hobi")
        }
    })
}

exports.getUpdateHobby = (req, res) => {
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

exports.postUpdateHobby = (req, res) => {
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