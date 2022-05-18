import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      immutable: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User