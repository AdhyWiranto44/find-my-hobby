const mongoose = require("mongoose")
const {categorySchema} = require("./Category.js")

const suggestionSchema = mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    category: [categorySchema],
    img: String,
    visited_count: Number,
    suggester_email: String,
    created_at: Date,
    updated_at: Date
})

const Suggestion = mongoose.model("Suggestion", suggestionSchema)

module.exports = Suggestion