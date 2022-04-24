import mongoose, { Schema } from "mongoose";
import { categorySchema } from "./Category";

const hobbySchema = new Schema({
    name: String,
    slug: String,
    description: String,
    category: [categorySchema],
    img: String,
    visited_count: Number,
    suggester_email: String,
    created_at: Date,
    updated_at: Date
});

const Hobby = mongoose.model("Hobby", hobbySchema)

export default Hobby