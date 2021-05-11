// Require Modules
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const PORT = 3000;

// Express
const app = express();

// Use
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());

// Set Modules
app.set("view engine", "ejs");

// MongoDB
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    created_at: Date,
    updated_at: Date
})
userSchema.plugin(passportLocalMongoose);

const categorySchema = mongoose.Schema({
    name: String,
    slug: String
})

const hobbySchema = mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    category: [categorySchema],
    img: String,
    visited_count: Number,
    created_at: Date,
    updated_at: Date
})

const suggestionSchema = mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    category: [categorySchema],
    img: String,
    visited_count: Number,
    created_at: Date,
    updated_at: Date
})

const User = mongoose.model("User", userSchema);
const Category = mongoose.model("Category", categorySchema);
const Hobby = mongoose.model("Hobby", hobbySchema);
const Suggestion = mongoose.model("Suggestion", suggestionSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const showAlert = function(color, message) {
    return `<div class="alert ${color} alert-dismissible fade show shadow-sm" role="alert">${message}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;
}

const category1 = new Category({
    name: "Teknologi",
    slug: "teknologi"
})

const category2 = new Category({
    name: "Audio Visual",
    slug: "audio-visual"
})

const category3 = new Category({
    name: "Sastra",
    slug: "sastra"
})

const category4 = new Category({
    name: "Kerajinan",
    slug: "kerajinan"
})

const category5 = new Category({
    name: "Otomotif",
    slug: "otomotif"
})

const menyanyi = new Hobby({
    name: "Menyanyi",
    slug: "menyanyi",
    description: "Menyanyi merupakan salah satu hobi yang populer di dunia.",
    category: [{
        _id: "6098e75d306eb4115cbe2619",
        name: "Audio Visual",
        slug: "audio-visual"
    }],
    img: "",
    visited_count: 0,
    created_at: Date(),
    updated_at: Date()
})

const menari = new Hobby({
    name: "Menari",
    slug: "menari",
    description: "Menari merupakan salah satu hobi yang populer di dunia.",
    category: [{
        _id: "6098e75d306eb4115cbe2619",
        name: "Audio Visual",
        slug: "audio-visual"
    }],
    img: "",
    visited_count: 0,
    created_at: Date(),
    updated_at: Date()
})

const coding = new Hobby({
    name: "Coding",
    slug: "coding",
    description: "Coding adalah memuat program seperti website.",
    category: [{
        _id: "6098e75d306eb4115cbe2618",
        name: "Teknologi",
        slug: "teknologi"
    }],
    img: "",
    visited_count: 0,
    created_at: Date(),
    updated_at: Date()
})

const mendayung = new Suggestion({
    name: "Mendayung perahu",
    slug: "mendayung-perahu",
    description: "ya mendayung",
    category: [{
        _id: "6098e75d306eb4115cbe2618",
        name: "Teknologi",
        slug: "teknologi"
    }],
    img: "",
    visited_count: 0,
    created_at: Date(),
    updated_at: Date()
})

const memancing = new Suggestion({
    name: "Memancing",
    slug: "memancing",
    description: "ya mendayung",
    category: [{
        _id: "6098e75d306eb4115cbe2618",
        name: "Teknologi",
        slug: "teknologi"
    }],
    img: "",
    visited_count: 0,
    created_at: Date(),
    updated_at: Date()
})

const berlayar = new Suggestion({
    name: "Berlayar",
    slug: "berlayar",
    description: "ya mendayung",
    category: [{
        _id: "6098e75d306eb4115cbe2618",
        name: "Teknologi",
        slug: "teknologi"
    }],
    img: "",
    visited_count: 0,
    created_at: Date(),
    updated_at: Date()
})

// User.register({username: "admin", created_at: Date(), updated_at: Date()}, "1234");
// Category.insertMany([category1, category2, category3, category4, category5]);
// menyanyi.save();
// Hobby.insertMany([menari, coding]);
// Suggestion.insertMany([mendayung, memancing, berlayar]);

// Routes
app.get("/", (req, res) => {
    Hobby.find((err, foundHobbies) => {
        if (err) {
            res.redirect("/");
        } else {
            if (foundHobbies !== null) {
                Category.find((err, foundCategory) => {
                    res.render("index", {currentDate: new Date().getFullYear(), hobbies: foundHobbies, categories: foundCategory});
                })
            } else {
                res.redirect("/");
            }
        }
    }).limit(5).sort({visited_count: -1});
})

app.post("/", (req, res) => {
    res.redirect("/s/"+req.body.search);
})

app.get("/a/:kategori", (req, res) => {
    const kategori = req.params.kategori;

    Category.findOne({slug: kategori}, (err, foundCategory) => {
        if (err) {
            res.redirect("/");
        } else {
            if (foundCategory !== null) {
                Hobby.find({"category._id": foundCategory._id}, (err, foundHobbies) => {
                    if (err) {
                        res.redirect("/");
                    } else {
                        if (foundHobbies !== null && foundHobbies.length > 0) {
                            res.render("cari-hobi", {currentDate: new Date().getFullYear(), kind: "kategori", hobbies: foundHobbies});
                        } else {
                            res.redirect("/");
                        }
                    }
                })
            } else {
                res.redirect("/");
            }
        }
    })
})

app.get("/d/:kategori/:hobi", (req, res) => {
    const kategori = req.params.kategori;
    const hobi = req.params.hobi;

    Category.findOne({slug: kategori}, (err, foundCategory) => {
        if (err) {
            res.redirect("/");
        } else {
            if (foundCategory !== null) {
                Hobby.findOne({slug: hobi, "category._id": foundCategory._id}, (err, foundHobby) => {
                    if (err) {
                        res.redirect("/");
                    } else {
                        if (foundHobby !== null) {
                            let visited_count = foundHobby.visited_count;
                            visited_count++;
                            Hobby.findOneAndUpdate({slug: foundHobby.slug}, {visited_count}, (err, hobbyChanged) => {
                                if (err) {
                                    res.redirect("/"); 
                                } else {
                                    res.render("hobi", {currentDate: new Date().getFullYear(), hobby: foundHobby});
                                }
                            })
                        } else {
                            res.redirect("/");
                        }
                    }
                })
            } else {
                res.redirect("/");
            }
        }
    })
})

app.get("/s/", (req, res) => {

    Hobby.find((err, foundHobbies) => {
        if (err) {
            res.redirect("/");
        } else {
            if (foundHobbies !== null) {
                res.render("cari-hobi", {currentDate: new Date().getFullYear(), kind: "", hobbies: foundHobbies});
            } else {
                res.redirect("/");
            }
        }
    })
})

app.get("/s/:search", (req, res) => {
    const search = req.params.search;

    Hobby.find({name: {$regex: ".*"+search+".*", $options: 'i'}}, (err, foundHobbies) => {
        if (err) {
            res.redirect("/");
        } else {
            if (foundHobbies !== null) {
                res.render("cari-hobi", {currentDate: new Date().getFullYear(), kind: "mencari", hobbies: foundHobbies, search});
            } else {
                res.redirect("/");
            }
        }
    })
})

app.get("/carikan-saya-hobi", (req, res) => {
    Hobby.findOne((err, foundHobby) => {
        if (err) {
            res.redirect("/");
        } else {
            const recommendedHobby = foundHobby.slug;
            const hobbyCategory = foundHobby.category[0].slug;
            res.redirect(`/d/${hobbyCategory}/${recommendedHobby}`);
        }
    }).sort({visited_count: -1});
})

app.get("/saran-hobi", (req, res) => {
    res.render("saran-hobi");
})

app.get("/auth/login", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/admin/dashboard");
    } else {
        res.render("login", {currentDate: new Date().getFullYear()});
    }
})

app.post("/auth/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    User.findOne({username: user.username}, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.redirect("/auth/login");
        } else {
            if (foundUser !== null) {
                req.login(user, (err) => {
                    if (err) {
                        console.log(err);
                        res.redirect("/auth/login");
                    } else {
                        passport.authenticate('local')(req, res, function() {
                            res.redirect('/admin/dashboard');
                        });
                    }
                })
            } else {
                res.redirect("/auth/login");
            }
        }
    })
})

app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/login");
})

app.get("/admin/dashboard", (req, res) => {
    if (req.isAuthenticated()) {
        Hobby.find((err, foundHobbies) => {
            Suggestion.find((err, foundSuggestions) => {
                res.render("dashboard", {title: "Dashboard", hobbies_length: foundHobbies.length, suggestions_length: foundSuggestions.length});
            })
        })
    } else {
        res.redirect("/auth/login");
    }
})

app.get("/admin/tampil-semua-hobi", (req, res) => {
    if (req.isAuthenticated()) {
        Hobby.find((err, foundHobbies) => {
            res.render("tampil-semua-hobi", {title: "Tampil Semua Hobi", hobbies: foundHobbies});
        }).sort({created_at: -1});
    } else {
        res.redirect("/auth/login");
    }
})

app.post("/admin/tampil-semua-hobi", (req, res) => {
    const search = req.body.search;

    if (search !== "") {
        Hobby.find({name: {$regex: ".*"+search+".*", $options: 'i'}}, (err, foundHobbies) => {
            res.render("tampil-semua-hobi", {title: "Tampil Semua Hobi", hobbies: foundHobbies});
        })
    } else {
        res.redirect("/admin/tampil-semua-hobi");
    }
})

app.get("/admin/tambah-hobi-baru", (req, res) => {
    if (req.isAuthenticated()) {
        Category.find((err, foundCategory) => {
            res.render("tambah-hobi-baru", {title: "Tambah Hobi Baru", alert: "", hobby: "", categories: foundCategory});
        })
    } else {
        res.redirect("/auth/login");
    }
})

app.post("/admin/tambah-hobi-baru", (req, res) => {
    const hobiBaru = req.body;

    Category.findOne({_id: hobiBaru.category}, (err, foundCategory) => {
        if (err) {
            res.redirect("/admin/tambah-hobi-baru");
        } else {
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
        }
    })
})

app.post("/admin/menghapus-hobi", (req, res) => {
    const hapusHobi = req.body.hapusHobi;

    Hobby.findByIdAndRemove({_id: hapusHobi}, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/admin/tampil-semua-hobi");
        }
    })
})

app.get("/admin/mengubah-hobi/:slug", (req, res) => {
    if (req.isAuthenticated()) {
        const slugHobi = req.params.slug;
        Hobby.findOne({slug: slugHobi}, (err, foundHobby) => {
            if (foundHobby !== null) {
                Category.find((err, foundCategory) => {
                    res.render("tambah-hobi-baru", {title: "Mengubah Hobi", hobby: foundHobby, categories: foundCategory, alert: ""});
                })
            } else {
                res.redirect("/admin/tampil-semua-hobi");
            }
        })
    } else {
        res.redirect("/auth/login");
    }
})

app.post("/admin/mengubah-hobi", (req, res) => {
    const hobi = req.body;

    Category.findOne({_id: hobi.category}, (err, foundCategory) => {
        if (err) {
            res.redirect("/admin/tampil-semua-hobi");
        } else {
            if (foundCategory !== null) {
                const hobiTerubah = {
                    name: hobi.name,
                    description: hobi.description,
                    category: [foundCategory],
                    img: "",
                    updated_at: Date()
                };

                Hobby.findByIdAndUpdate(hobi.id_hobi, hobiTerubah, (err) => {
                    res.redirect("/admin/tampil-semua-hobi");
                })
            } else {
                res.redirect("/admin/tampil-semua-hobi");
            }
        }
    })
    
})

app.get("/admin/tambah-kategori", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("tambah-kategori", {title: "Tambah Kategori", alert: "", category: ""});
    } else {
        res.redirect("/auth/login");
    }
})

app.post("/admin/tambah-kategori", (req, res) => {
    const kategoriBaru = req.body;

    Category.findOne({name: kategoriBaru.name}, (err, foundCategory) => {
        if (err) {
            res.redirect("/admin/tambah-kategori");
        } else {
            if (foundCategory === null) {
                const newCategory = new Category({
                    name: kategoriBaru.name,
                    slug: kategoriBaru.name.replace(/\s+/g, '-').toLowerCase()
                });

                newCategory.save();
                res.redirect("/admin/tampil-kategori");
            } else {
                res.redirect("/admin/tambah-kategori");
            }
        }
    })
})

app.get("/admin/tampil-kategori", (req, res) => {
    if (req.isAuthenticated()) {
        Category.find((err, foundCategories) => {
            if (err) {
                res.redirect("/admin/dashboard");
            } else {
                if (foundCategories !== null) {
                    res.render("tampil-kategori", {title: "Tampil Kategori", alert: "", categories: foundCategories});
                } else {
                    res.redirect("/admin/dashboard");
                }
            }
        })
    } else {
        res.redirect("/auth/login");
    }
})

app.post("/admin/tampil-kategori", (req, res) => {
    const search = req.body.search;

    if (search !== "") {
        Category.find({name: {$regex: ".*"+search+".*", $options: 'i'}}, (err, foundCategories) => {
            res.render("tampil-kategori", {title: "Tampil Kategori", categories: foundCategories});
        })
    } else {
        res.redirect("/admin/tampil-kategori");
    }
})

app.post("/admin/menghapus-kategori", (req, res) => {
    const hapusKategori = req.body.hapusKategori;

    Category.findByIdAndRemove({_id: hapusKategori}, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/admin/tampil-kategori");
        }
    })
})

app.get("/admin/mengubah-kategori/:slug", (req, res) => {
    if (req.isAuthenticated()) {
        const slugKategori = req.params.slug;
        Category.findOne({slug: slugKategori}, (err, foundCategory) => {
            if (foundCategory !== null) {
                res.render("tambah-kategori", {title: "Mengubah Kategori", category: foundCategory, alert: ""});
            } else {
                res.redirect("/admin/tampil-kategori");
            }
        })
    } else {
        res.redirect("/auth/login");
    }
})

app.post("/admin/mengubah-kategori", (req, res) => {
    const kategori = req.body;
    
    Category.findByIdAndUpdate(kategori.id_kategori, {name: kategori.name}, (err) => {
        res.redirect("/admin/tampil-kategori");
    })
})

app.get("/admin/tampil-saran-hobi", (req, res) => {
    if (req.isAuthenticated()) {
        Suggestion.find((err, foundSuggestions) => {
            res.render("tampil-saran-hobi", {title: "Tampil Saran Hobi", suggestions: foundSuggestions});
        }).sort({created_at: -1});
    } else {
        res.redirect("/auth/login");
    }
})

app.post("/admin/menerima-saran-hobi", (req, res) => {
    const tambahSaran = req.body.tambahSaran;

    Suggestion.findOne({_id: tambahSaran}, (err, foundSuggestion) => {
        if (err) {
            res.redirect("/admin/tampil-saran-hobi");
        } else {
            Hobby.findOne({slug: foundSuggestion.slug}, (err, foundHobby) => {
                if (err) {
                    res.redirect("/admin/tampil-saran-hobi");
                } else {
                    if (foundHobby === null) {
                        const saranHobi = new Hobby({
                            name: foundSuggestion.name,
                            slug: foundSuggestion.slug,
                            description: foundSuggestion.name,
                            category: [{
                                _id: foundSuggestion.category[0]._id,
                                name: foundSuggestion.category[0].name,
                                slug: foundSuggestion.category[0].slug
                            }],
                            img: foundSuggestion.img,
                            visited_count: 0,
                            created_at: Date(),
                            updated_at: Date()
                        })
                        saranHobi.save();
                        Suggestion.findByIdAndRemove(foundSuggestion._id, (err) => {
                            if (err) {
                                res.redirect("/admin/tampil-saran-hobi");
                            } else {
                                res.redirect("/admin/tampil-semua-hobi");
                            }
                        })
                    } else {
                        res.redirect("/admin/tampil-saran-hobi");
                    }
                }
            })
        }
    })
})

app.post("/admin/menolak-saran-hobi", (req, res) => {
    const tolakSaran = req.body.tolakSaran;

    Suggestion.findByIdAndRemove(tolakSaran, (err) => {
        if (err) {
            res.redirect("/admin/tampil-saran-hobi");
        } else {
            res.redirect("/admin/tampil-saran-hobi");
        }
    })
})

app.listen(PORT, () => {
    "http://localhost:" + PORT
});