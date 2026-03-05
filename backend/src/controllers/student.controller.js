import User from "../models/user.model.js";
import Role from "../models/role.js";
import bcrypt from "bcryptjs";

async function getStudents(req, res) {
  try {
    const studentRole = await Role.findOne({ slug: "student" });
    if (!studentRole) return res.status(404).json({ error: "Student role not found" });

    const students = await User.find({ role_id: studentRole._id }).populate("class_id");
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createStudent(req, res) {
  try {
    const { name, email, password, phone, age, class_id } = req.body;
    const studentRole = await Role.findOne({ slug: "student" });
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = await User.create({
      name, email, phone, age,
      password: hashedPassword,
      role_id: studentRole._id,
      class_id: class_id || null
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateStudent(req, res) {
  try {
    const updateData = { ...req.body };
    if (updateData.class_id === "") updateData.class_id = null;

    const student = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteStudent(req, res) {
  try {
    const student = await User.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export { getStudents, createStudent, updateStudent, deleteStudent };
