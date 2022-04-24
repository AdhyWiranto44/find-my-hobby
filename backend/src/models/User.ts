import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    username: String,
    password: String,
    created_at: Date,
    updated_at: Date
})

const User = mongoose.model("User", userSchema)

export default User