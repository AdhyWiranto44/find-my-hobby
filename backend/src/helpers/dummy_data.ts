import { hashSync } from "bcrypt";
import { Category } from "../models/Category";
import Hobby from "../models/Hobby";
import Suggestion from "../models/Suggestion";


const category1 = {
    name: "Teknologi",
    slug: "teknologi"
}

const category2 = {
    name: "Audio Visual",
    slug: "audio-visual"
}

const category3 = {
    name: "Sastra",
    slug: "sastra"
}

const category4 = {
    name: "Kerajinan",
    slug: "kerajinan"
}

const category5 = {
    name: "Otomotif",
    slug: "otomotif"
}

const menyanyi = {
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
}

const menari = {
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
}

const coding = {
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
}

// const mendayung = new Suggestion({
//     name: "Mendayung perahu",
//     slug: "mendayung-perahu",
//     description: "ya mendayung",
//     category: [{
//         _id: "6098e75d306eb4115cbe2618",
//         name: "Teknologi",
//         slug: "teknologi"
//     }],
//     img: "",
//     visited_count: 0,
//     suggester_email: "adhy@gmail.com",
//     created_at: Date(),
//     updated_at: Date()
// })

// const memancing = new Suggestion({
//     name: "Memancing",
//     slug: "memancing",
//     description: "ya mendayung",
//     category: [{
//         _id: "6098e75d306eb4115cbe2618",
//         name: "Teknologi",
//         slug: "teknologi"
//     }],
//     img: "",
//     visited_count: 0,
//     suggester_email: "adhy@gmail.com",
//     created_at: Date(),
//     updated_at: Date()
// })

// const berlayar = new Suggestion({
//     name: "Berlayar",
//     slug: "berlayar",
//     description: "ya mendayung",
//     category: [{
//         _id: "6098e75d306eb4115cbe2618",
//         name: "Teknologi",
//         slug: "teknologi"
//     }],
//     img: "",
//     visited_count: 0,
//     suggester_email: "adhy@gmail.com",
//     created_at: Date(),
//     updated_at: Date()
// })

const userAdmin = {
  "username": "admin",
  "password": hashSync("12345", 12),
  created_at: Date(),
  updated_at: Date()
}

export const default_categories = [category1, category2, category3, category4, category5];
export const default_hobbies = [menyanyi, menari, coding];
// export const default_suggestions = [mendayung, memancing, berlayar];
export const default_users = [userAdmin];