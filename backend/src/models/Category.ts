import mongoose, { Schema } from "mongoose";

export const categorySchema = new Schema({
    name: String,
    slug: String
})

export const Category = mongoose.model("Category", categorySchema);