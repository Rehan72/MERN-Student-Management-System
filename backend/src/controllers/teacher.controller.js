import User from "../models/user.model.js";
import Role from "../models/role.js";
import bcrypt from "bcryptjs";

async function getTeachers(req, res) {
  try {
    const teacherRole = await Role.findOne({ slug: "teacher" });
    if (!teacherRole) return res.status(404).json({ error: "Teacher role not found" });

    const teachers = await User.find({ role_id: teacherRole._id });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createTeacher(req, res) {
  try {
    const { name, email, password, phone, age } = req.body;
    const teacherRole = await Role.findOne({ slug: "teacher" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const teacher = await User.create({
      name, email, phone, age,
      password: hashedPassword,
      role_id: teacherRole._id
    });

    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateTeacher(req, res) {
  try {
    const teacher = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteTeacher(req, res) {
  try {
    const teacher = await User.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export { getTeachers, createTeacher, updateTeacher, deleteTeacher };
