import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // Optional initially
  },
  room: {
    type: String,
    required: false,
  },
  schedule: {
    type: String,
    required: false,
  }
}, { timestamps: true });

const Class = mongoose.model("Class", classSchema);

export default Class;
