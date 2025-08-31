import React, { useContext } from 'react';
import { appContext } from '../context/appContext';
import { FiCheck, FiTrash2 } from 'react-icons/fi'; 

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const TaskCard = ({ task }) => {
  const { handleMarkComplete, handleDelete } = useContext(appContext);

  return (
    <div
      className={`p-6 mb-5 rounded-xl shadow-lg border 
      ${task.status === 'completed' ? 'bg-green-50 border-green-400' : 'bg-yellow-50 border-yellow-400'}
      hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
        <span
          className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-full 
          ${task.status === 'completed' 
            ? 'text-green-900 bg-green-300' 
            : 'text-yellow-900 bg-yellow-300'}`}
        >
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>

      <p className="text-gray-700 mt-2 mb-3 leading-relaxed">{task.description}</p>

      <p className="text-sm text-gray-500 italic flex  gap-2">
        Due: <span className="font-medium">{formatDate(task.dueDate)}</span>
        Time: <span className="font-medium">{task.dueTime}</span>
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {task.status !== 'completed' && (
          <button
            onClick={() => handleMarkComplete(task._id)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            aria-label="Mark task as completed"
          >
            <FiCheck className="h-5 w-5" />
            Mark Completed
          </button>
        )}

        <button
          onClick={() => handleDelete(task._id)}
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          aria-label="Delete task"
        >
          <FiTrash2 className="h-5 w-5" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
