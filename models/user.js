import mongoose from "mongoose"

// userSchema = collection's schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false }
})

// User = collection's name
const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User