const Hobby = require("../models/Hobby.js");
const {Category} = require("../models/Category.js");


exports.index = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/auth/login");
    }

    let hobbies = [];

    await Hobby.find().sort({created_at: -1}).exec()
    .then(foundHobbies => {
        if (foundHobbies.length > 0) {
            hobbies = [...foundHobbies];
        }
    })
    .catch(err => {
        console.error(err);
    });

    const data = {
        title: "Tampil Semua Hobi", 
        hobbies: hobbies
    }
    res.render("tampil-semua-hobi", data);
}

exports.show = async (req, res) => {
    const categorySlug = req.params.categorySlug;
    const hobbySlug = req.params.hobbySlug;
    let hobby = null;

    await Hobby.findOne({slug: hobbySlug, "category.slug": categorySlug}).exec()
    .then(foundHobby => {
        if (foundHobby !== null) {
            hobby = foundHobby;
            let visited_count = hobby.visited_count;
            visited_count++;
            return Hobby.findOneAndUpdate({slug: hobby.slug}, {visited_count}).exec();
        }
    })
    .catch(err => {
        console.log(err);
        return res.redirect("/");
    });

    const data = {
        currentDate: new Date().getFullYear(), 
        hobby: hobby
    }

    res.render("hobi", data);
}

exports.edit = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/auth/login");
    }

    const hobbySlug = req.params.slug;
    let hobby = null;
    let categories = [];

    await Hobby.findOne({slug: hobbySlug}).exec()
    .then(foundHobby => {
        if (foundHobby !== null) {
            hobby = foundHobby;
        } else {
            res.redirect("/admin/tampil-semua-hobi");
        }
    })
    .catch(err => {
        console.log(err);
        res.redirect("/admin/tampil-semua-hobi");
    });

    await Category.find().sort({name: 1}).exec()
    .then((foundCategories) => {
        if (foundCategories.length > 0) {
            categories = [...foundCategories];
        } else {
            res.redirect("/admin/tampil-semua-hobi");
        }
    })
    .catch(err => {
        console.log(err);
        res.redirect("/admin/tampil-semua-hobi");
    });

    const data = {
        title: "Mengubah Hobi", 
        hobby: hobby, 
        categories: categories, 
        alert: ""
    }
    res.render("tambah-hobi-baru", data);
}

exports.update = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/auth/login");
    }

    const hobi = req.body;

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

            Hobby.findByIdAndUpdate(hobi.id_hobi, hobiTerubah).exec();
        }
    })
    .catch(err => {
        console.error(err);
    });

    res.redirect("/admin/tampil-semua-hobi");
}

exports.find = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/auth/login");
    }

    const search = req.body.search || "";
    let hobbies = [];

    if (search === "") {
        return res.redirect("/admin/tampil-semua-hobi");
    }

    await Hobby.find({name: {$regex: ".*"+search+".*", $options: 'i'}}).exec()
    .then(foundHobbies => {
        if (foundHobbies.length > 0) {
            hobbies = [...foundHobbies];
        } else {
            return res.redirect("/admin/tampil-semua-hobi");
        }
    })
    .catch(err => {
        console.error(err);
        return res.redirect("/admin/tampil-semua-hobi");
    });

    const data = {
        title: "Tampil Semua Hobi", 
        hobbies: hobbies
    }
    res.render("tampil-semua-hobi", data);
}

exports.create = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/auth/login");
    }

    let categories = [];
    
    await Category.find().sort({name: 1}).exec()
    .then(foundCategories => {
        if (foundCategories.length > 0) {
            categories = [...foundCategories];
        } else {
            return res.redirect("/admin/tampil-semua-hobi");
        }
    })
    .catch(err => {
        console.error(err);
        return res.redirect("/admin/tampil-semua-hobi");
    });

    const data = {
        title: "Tambah Hobi Baru", 
        alert: "", 
        hobby: "", 
        categories: categories
    }
    res.render("tambah-hobi-baru", data);
}

exports.store = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/auth/login");
    }

    const hobiBaru = req.body;

    await Category.findOne({_id: hobiBaru.category}).exec()
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
            });

            newHobby.save();
            res.redirect("/admin/tampil-semua-hobi");
        } else {
            res.redirect("/admin/tambah-hobi-baru");
        }
    })
    .catch(err => {
        console.error(err);
        return res.redirect("/admin/tampil-semua-hobi");
    });
}

exports.destroy = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/auth/login");
    }

    const hobbyId = req.body.hobbyId;

    await Hobby.findByIdAndRemove({_id: hobbyId}, (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.redirect("/admin/tampil-semua-hobi");
}