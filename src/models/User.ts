import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  hashedPassword: String,
});

const User = mongoose.model("User", userSchema);

export default User;
