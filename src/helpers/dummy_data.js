const {Category} = require("../models/category");
const Hobby = require("../models/hobby");
const Suggestion = require("../models/suggestion");


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
    suggester_email: "adhy@gmail.com",
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
    suggester_email: "adhy@gmail.com",
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
    suggester_email: "adhy@gmail.com",
    created_at: Date(),
    updated_at: Date()
})

const default_categories = [category1, category2, category3, category4, category5];
const default_hobbies = [menyanyi, menari, coding];
const default_suggestions = [mendayung, memancing, berlayar];


module.exports = [default_categories, default_hobbies, default_suggestions];