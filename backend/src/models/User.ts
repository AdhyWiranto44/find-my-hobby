import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    username: {
      type: String,
      unique: true,
      immutable: true
    },
    password: String,
    created_at: Date,
    updated_at: Date
})

const User = mongoose.model("User", userSchema)

export default User