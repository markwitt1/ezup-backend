import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: { type: String, required: true },
  uploads: { type: [String], default: [] },
});

const User = mongoose.model("User", userSchema);

export default User;
