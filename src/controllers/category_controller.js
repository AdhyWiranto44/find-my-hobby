const Hobby = require("../models/hobby");
const {Category} = require("../models/category");


exports.index = (req, res) => {
    let categories = [];

    if (!req.isAuthenticated()) {
        return res.redirect("/auth/login");   
    }

    Category.find().sort({name: 1}).exec()
    .then(foundCategories => {
        if (foundCategories.length > 0) {
            categories = [...foundCategories];
        } else {
            res.redirect("/admin/dashboard");
        }
    })
    .catch(err => {
        console.log(err);
        res.redirect("/admin/dashboard");
    });

    const data = {
        title: "Tampil Kategori", 
        alert: "", 
        categories: categories
    }
    res.render("tampil-kategori", data);
}

exports.show = (req, res) => {
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
}

exports.create = (req, res) => {
    if (req.isAuthenticated()) {
        res.render("tambah-kategori", {title: "Tambah Kategori", alert: "", category: ""})
    } else {
        res.redirect("/auth/login")
    }
}

exports.store = (req, res) => {
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

exports.find = (req, res) => {
    const search = req.body.search

    if (search !== "") {
        Category.find({name: {$regex: ".*"+search+".*", $options: 'i'}}, (err, foundCategories) => {
            res.render("tampil-kategori", {title: "Tampil Kategori", categories: foundCategories})
        })
    } else {
        res.redirect("/admin/tampil-kategori")
    }
}

exports.destroy = (req, res) => {
    const hapusKategori = req.body.hapusKategori

    Category.findByIdAndRemove({_id: hapusKategori}, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/admin/tampil-kategori")
        }
    })
}


exports.edit = (req, res) => {
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

exports.update = (req, res) => {
    const kategori = req.body
    
    Category.findByIdAndUpdate(kategori.id_kategori, {name: kategori.name}, (err) => {
        res.redirect("/admin/tampil-kategori")
    })
}