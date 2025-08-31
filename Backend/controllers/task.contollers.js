import Task from "../models/task.model.js";

export const CreateTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, dueDate, dueTime, priority } = req.body;

    if (!title || !dueDate || !dueTime) {
      return res.status(400).json({
        success: false,
        message: "Title, due date, and due time are required.",
      });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      dueTime,
      user: userId,
      priority,
    });

    const savedTask = await newTask.save();

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: savedTask,
    });
    
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await Task.find({ user: userId });
    return res.status(201).json({
      success: true,
      message: "Task get successfully",
      tasks: tasks,
    });
  } catch (error) {
    console.error("Error geting task:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { taskId } = req.params;

    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      user: userId,
    });

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or you don't have permission to delete it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const markTaskCompleted = async (req, res) => {
  try {
    const userId = req.userId;
    const { taskId } = req.params;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { status: "completed" },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or you don't have permission to update it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task marked as completed",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const EditTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const { taskId } = req.params;
    const { title, description, dueDate, dueTime } = req.body;
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
