import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({
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

const Role = mongoose.model("Role", roleSchema);

export default Role;