import app from "./src/app.js";
import router from "./src/routes/user.route.js";
import roleRouter from "./src/routes/role.route.js";
import studentRouter from "./src/routes/student.route.js";
import teacherRouter from "./src/routes/teacher.route.js";
import classRouter from "./src/routes/class.route.js";
import "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

app.get("/", (req, res) => {
  res.send("Bun + Express backend running");
});

app.use("/api", roleRouter);
app.use("/api", router);
app.use("/api", studentRouter);
app.use("/api", teacherRouter);
app.use("/api", classRouter);


app.listen(3000, () => {
   
  console.log("Server running on port 3000");
});
