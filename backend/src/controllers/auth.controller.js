import Role from "../models/role.js";
import User from "../models/user.model.js";
import generateToken from "../utils/generate.token.js";
import { validateEmail,validateIndianPhone,validatePassword } from "../utils/validater.js";
import bcrypt from "bcryptjs";

async function register(req, res) {
   try {
      const { name, email, password,phone,role,age } = req.body;
      if (!name || !email || !password || !phone || !role || !age) {
         return res.status(400).json({ error: "Name, email, phone, role and age are required" });
      }
      
      if (!validateEmail(email)) {
         return res.status(400).json({ error: "Invalid email format" });
      }

      if (!validateIndianPhone(phone)) {
         return res.status(400).json({ error: "Invalid Indian phone number" });
      }

      if (!validatePassword(password)) {
         return res.status(400).json({ error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)" });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ error: "Email already in use" });
      }
      const userRole=await Role.findOne({slug:role});
      if(!userRole){
         return res.status(400).json({ error: "Invalid role" });
      }
      // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

      // Simulate user creation
      const user = { name, email, phone, role_id: userRole._id, age, password: hashedPassword };
        const createdUser = await User.create(user);
      res.status(201).json({user:createdUser,message:`${userRole.name} registered successfully`});
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

async function login(req, res) {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(400).json({ error: "Email and password are required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ error: "Invalid email " });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ error: "Invalid  password" });
      }
      
      // Generate JWT token here and send it in response
      const token = await generateToken(user);
      res.status(200).json({ token, message: "Login successful" });
   }  catch (error) {
      res.status(400).json({ error: error.message });
   }
}

export { register ,login};