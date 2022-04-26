import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    username: {
      type: String,
      unique: true,
      immutable: true
    },
    password: String
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User