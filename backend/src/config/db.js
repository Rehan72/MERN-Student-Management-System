import mongoose from "mongoose";

mongoose.connect("mongodb://admin:admin123@localhost:27017/student-management-system?authSource=admin")
  .then(() => console.log("Connected to student management DB"))
  .catch(err => console.log(err));

 export default mongoose; 