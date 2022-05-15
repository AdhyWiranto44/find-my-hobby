import mongoose, { Schema } from "mongoose";

const hobbySchema = new Schema({
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      immutable: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    img: String,
    visited_count: Number,
    community_name: String,
    community_link: String,
    suggester_email: String
}, { timestamps: true });

const Hobby = mongoose.model("Hobby", hobbySchema)

export default Hobby