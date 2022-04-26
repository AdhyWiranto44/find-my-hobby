import mongoose, { Schema } from "mongoose";

export const categorySchema = new Schema({
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      immutable: true
    }
}, { timestamps: true })

export const Category = mongoose.model("Category", categorySchema);