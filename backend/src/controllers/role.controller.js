import Role from "../models/role.js";


async function createRole(req, res) {
   try {
        const { name, slug } = req.body;
        if (!name || !slug) {
           return res.status(400).json({ error: "Name and slug are required" });
        }   
      const role = await Role.create(req.body);
      res.status(201).json(role);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

async function getRoles(req, res) {
   try {
      const roles = await Role.find();
      res.status(200).json(roles);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

async function getRoleById(req, res) {
   try {
      const role = await Role.findById(req.params.id);
      if (!role) {
         return res.status(404).json({ error: "Role not found" });
      }
      res.status(200).json(role);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

async function updateRole(req, res) {
   try {
      const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!role) {
         return res.status(404).json({ error: "Role not found" });
      }
      res.status(200).json(role);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

async function deleteRole(req, res) {
   try {
      const role = await Role.findByIdAndDelete(req.params.id);
      if (!role) {
         return res.status(404).json({ error: "Role not found" });
      }
      res.status(200).json({ message: "Role deleted successfully" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

export { createRole, getRoles, getRoleById, updateRole, deleteRole };