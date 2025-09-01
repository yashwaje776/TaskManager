import React, { useContext, useState } from "react";
import axios from "axios";
import SideBar from "../component/SideBar";
import { appContext } from "../context/appContext";
import { toast } from "react-toastify";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [loading, setLoading] = useState(false);
  const { backendUrl, token, navigate, settasks } = useContext(appContext);
  const [priority, setpriority] = useState("low");
  const date = new Date().toISOString().split("T")[0];
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!dueDate || !dueTime) {
      toast.error("Both due date and due time are required");
      return;
    }

    setLoading(true);

    try {
      const taskData = {
        title,
        description,
        dueDate,
        dueTime,
        priority,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/tasks/create`,
        taskData,
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        settasks((prev) => [...prev, data.task]);
        toast.success("Task added successfully!");
        setTitle("");
        setDescription("");
        setDueDate("");
        setDueTime("");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex-1 md:ml-[250px] items-center p-8">
        <h1 className="text-3xl  font-bold mb-8">Add New Task</h1>

        <form onSubmit={handleSubmit} className="max-w-lg" noValidate>
          <label htmlFor="title" className="block mb-2 font-semibold">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
            disabled={loading}
          />

          <label htmlFor="description" className="block mb-2 font-semibold">
            Description
          </label>
          <textarea
            id="description"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-6 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            rows={4}
            disabled={loading}
          />

          <label htmlFor="dueDate" className="block mb-2 font-semibold">
            Due Date <span className="text-red-500">*</span>
          </label>
          <input
            id="dueDate"
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            disabled={loading}
            min={date}
          />

          <label htmlFor="dueTime" className="block mb-2 font-semibold">
            Due Time <span className="text-red-500">*</span>
          </label>
          <input
            id="dueTime"
            type="time"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            required
            disabled={loading}
          />
          <label htmlFor="">Choose a priority:</label>
          <select
            id="priority-select"
            value={priority}
            onChange={(e) => setpriority(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>
  );
};

export default AddTask;
