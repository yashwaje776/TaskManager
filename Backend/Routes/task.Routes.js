import express from "express";
import { check } from "../middleware/checkAuth.js";
import {
  CreateTasks,
  getTasks,
  deleteTask,
  markTaskCompleted,
} from "../controllers/task.contollers.js";

export const TaskRouter = express.Router();

TaskRouter.post("/create", check, CreateTasks);
TaskRouter.get("/get", check, getTasks);

TaskRouter.delete("/delete/:taskId", check, deleteTask);

TaskRouter.patch("/complete/:taskId", check, markTaskCompleted);
