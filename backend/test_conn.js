const mongoose = require('mongoose');

const uri = "mongodb://admin:admin123@127.0.0.1:27017/student-management-system?authSource=admin";

console.log("Connecting to:", uri);

mongoose.connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection error:", err);
    process.exit(1);
  });
