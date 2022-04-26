import mongoose, { Schema } from "mongoose"
import { categorySchema } from "./Category"

const suggestionSchema = new Schema({
    name: String,
    slug: {
      type: String,
      unique: true,
      immutable: true
    },
    description: String,
    category: [categorySchema],
    img: String,
    visited_count: Number,
    suggester_email: String
}, { timestamps: true })

const Suggestion = mongoose.model("Suggestion", suggestionSchema)

export default Suggestion