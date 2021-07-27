const {Category} = require("../models/category")

exports.getAddCategory = (req, res) => {
    if (req.isAuthenticated()) {
        res.render("tambah-kategori", {title: "Tambah Kategori", alert: "", category: ""})
    } else {
        res.redirect("/auth/login")
    }
}

exports.postAddCategory = (req, res) => {
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
}

exports.getAllCategory = (req, res) => {
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
}

exports.postAllCategory = (req, res) => {
    const search = req.body.search

    if (search !== "") {
        Category.find({name: {$regex: ".*"+search+".*", $options: 'i'}}, (err, foundCategories) => {
            res.render("tampil-kategori", {title: "Tampil Kategori", categories: foundCategories})
        })
    } else {
        res.redirect("/admin/tampil-kategori")
    }
}

exports.postRemoveCategory = (req, res) => {
    const hapusKategori = req.body.hapusKategori

    Category.findByIdAndRemove({_id: hapusKategori}, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/admin/tampil-kategori")
        }
    })
}

exports.getUpdateCategory = (req, res) => {
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
}

exports.postUpdateCategory = (req, res) => {
    const kategori = req.body
    
    Category.findByIdAndUpdate(kategori.id_kategori, {name: kategori.name}, (err) => {
        res.redirect("/admin/tampil-kategori")
    })
}