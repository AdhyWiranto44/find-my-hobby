import mongoose, { Schema } from "mongoose";

export const categorySchema = new Schema({
    name: String,
    slug: {
      type: String,
      unique: true,
      immutable: true
    }
})

export const Category = mongoose.model("Category", categorySchema);