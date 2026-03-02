import mongoose from 'mongoose';
import Role from './src/models/role.js';
import User from './src/models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = "mongodb://admin:admin123@localhost:27017/student-management-system?authSource=admin";

async function checkDb() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to DB");

    const roles = await Role.find();
    console.log("Roles:", JSON.stringify(roles, null, 2));

    const users = await User.find().populate('role_id');
    console.log("Users:", JSON.stringify(users, null, 2));

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkDb();
