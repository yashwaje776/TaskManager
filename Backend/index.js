import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { userRouter } from "./Routes/user.Routes.js";
import { TaskRouter } from "./Routes/task.Routes.js";
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
connectDB()

app.use('/api/user',userRouter);
app.use('/api/tasks',TaskRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
}); 

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
