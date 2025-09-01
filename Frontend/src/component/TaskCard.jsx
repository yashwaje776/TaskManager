import React, { useContext, useState } from 'react';
import { appContext } from '../context/appContext';
import { FiCheck, FiTrash2, FiEdit, FiSave, FiX } from 'react-icons/fi';
import axios from 'axios';

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const TaskCard = ({ task }) => {
  const { handleMarkComplete, handleDelete, getTasks, backendUrl, token } = useContext(appContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate.slice(0, 10),
    dueTime: task.dueTime,
    priority: task.priority || 'Medium',
  });

  const handleInputChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`${backendUrl}/api/tasks/edit/${task._id}`, editTask, {
        headers: { token },
      });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div
      className={`p-6 mb-5 rounded-xl shadow-lg border 
        ${task.status === 'completed' ? 'bg-green-50 border-green-400' : 'bg-yellow-50 border-yellow-400'}
        hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex justify-between items-start">
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={editTask.title}
            onChange={handleInputChange}
            className="text-xl font-bold text-gray-900 border-b border-gray-400 w-full bg-transparent outline-none"
          />
        ) : (
          <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
        )}

        <span
          className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-full 
            ${task.status === 'completed'
              ? 'text-green-900 bg-green-300'
              : 'text-yellow-900 bg-yellow-300'
            }`}
        >
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>

      {isEditing ? (
        <textarea
          name="description"
          value={editTask.description}
          onChange={handleInputChange}
          className="w-full mt-2 p-2 border rounded bg-white text-gray-700 resize-none"
          rows={3}
        />
      ) : (
        <p className="text-gray-700 mt-2 mb-3 leading-relaxed">{task.description}</p>
      )}

      <div className="text-sm text-gray-500 italic flex flex-col gap-2">
        {isEditing ? (
          <>
            <label className="flex gap-2 items-center">
              Due Date:
              <input
                type="date"
                name="dueDate"
                value={editTask.dueDate}
                onChange={handleInputChange}
                className="p-1 border rounded"
              />
            </label>

            <label className="flex gap-2 items-center">
              Due Time:
              <input
                type="time"
                name="dueTime"
                value={editTask.dueTime}
                onChange={handleInputChange}
                className="p-1 border rounded"
              />
            </label>

            <label className="flex gap-2 items-center">
              Priority:
              <select
                name="priority"
                value={editTask.priority}
                onChange={handleInputChange}
                className="p-1 border rounded"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </label>
          </>
        ) : (
          <>
            <p>
              Due: <span className="font-medium">{formatDate(task.dueDate)}</span> | Time: <span className="font-medium">{task.dueTime}</span>
            </p>
            <p>
              Priority: <span className="font-medium">{task.priority || 'medium'}</span>
            </p>
          </>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {!isEditing && task.status !== 'completed' && (
          <button
            onClick={() => handleMarkComplete(task._id)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FiCheck className="h-5 w-5" />
            Mark Completed
          </button>
        )}

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            <FiEdit className="h-5 w-5" />
            Edit
          </button>
        )}

        {isEditing && (
          <>
            <button
              onClick={handleEditSubmit}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <FiSave className="h-5 w-5" />
              Save
            </button>

            <button
              onClick={() => {
                setIsEditing(false);
                setEditTask({
                  title: task.title,
                  description: task.description,
                  dueDate: task.dueDate.slice(0, 10),
                  dueTime: task.dueTime,
                  priority: task.priority || 'medium',
                });
              }}
              className="flex items-center gap-2 bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              <FiX className="h-5 w-5" />
              Cancel
            </button>
          </>
        )}

        {!isEditing && (
          <button
            onClick={() => handleDelete(task._id)}
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <FiTrash2 className="h-5 w-5" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
