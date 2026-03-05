
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   age: {
      type: Number,
      required: false
   },
   phone: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true
   },
   class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: false
   }
});

const User = mongoose.model("User", userSchema);

export default User;