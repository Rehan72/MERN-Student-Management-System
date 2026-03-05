import Class from "../models/class.model.js";

async function createClass(req, res) {
  try {
    const { name, section, teacher_id, room, schedule } = req.body;
    if (!name || !section) {
      return res.status(400).json({ error: "Name and section are required" });
    }
    const newClass = await Class.create({ 
      name, 
      section, 
      teacher_id: teacher_id || null, 
      room, 
      schedule 
    });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getClasses(req, res) {
  try {
    const classes = await Class.find().populate("teacher_id", "name email");
    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getClassById(req, res) {
  try {
    const classData = await Class.findById(req.params.id).populate("teacher_id", "name email");
    if (!classData) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json(classData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateClass(req, res) {
  try {
    const updateData = { ...req.body };
    if (updateData.teacher_id === "") updateData.teacher_id = null;

    const classData = await Class.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!classData) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json(classData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteClass(req, res) {
  try {
    const classData = await Class.findByIdAndDelete(req.params.id);
    if (!classData) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export { createClass, getClasses, getClassById, updateClass, deleteClass };
