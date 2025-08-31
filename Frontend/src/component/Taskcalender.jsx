import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { appContext } from "../context/appContext";
import { FaCheckCircle, FaClock } from "react-icons/fa";

const formatDateLocal = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const TaskCalendar = () => {
  const { tasks } = useContext(appContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const taskDates = new Set(
    tasks.map((task) => formatDateLocal(new Date(task.dueDate)))
  );

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateStr = formatDateLocal(date);
      if (taskDates.has(dateStr)) {
        return (
          <div className="flex justify-center mt-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    const dateStr = formatDateLocal(date);
    if (view === "month") {
      if (date.toDateString() === new Date().toDateString()) {
        return "border border-blue-400 rounded-full";
      }
      if (taskDates.has(dateStr)) {
        return "bg-blue-50 rounded-md";
      }
      if (date.toDateString() === selectedDate.toDateString()) {
        return "bg-blue-200 font-semibold text-blue-800 rounded-md";
      }
    }
    return "";
  };

  const selectedTasks = tasks.filter(
    (task) =>
      new Date(task.dueDate).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        📅 Task Calendar
      </h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={tileClassName}
        tileContent={tileContent}
        className="text-sm border rounded-md"
      />

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-5 text-gray-900">
          Tasks for{" "}
          <span className="text-blue-600">{selectedDate.toDateString()}</span>
        </h3>

        {selectedTasks.length > 0 ? (
          <ul className="space-y-4">
            {selectedTasks.map((task) => (
              <li
                key={task._id}
                className="p-5 border rounded-lg bg-blue-50 hover:bg-blue-100 transition-shadow shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-semibold text-blue-800">
                    {task.title}
                  </h4>
                  <span
                    className={`text-sm font-semibold flex items-center gap-1 ${
                      task.status === "completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {task.status === "completed" ? (
                      <>
                        <FaCheckCircle /> Completed
                      </>
                    ) : (
                      <>
                        <FaClock /> Pending
                      </>
                    )}
                  </span>
                </div>
                {task.description && (
                  <p className="text-gray-700 mb-3">{task.description}</p>
                )}
                {task.dueTime && (
                  <p className="text-gray-600 flex items-center gap-1 text-sm font-medium">
                    <FaClock /> Due Time: {task.dueTime}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No tasks on this day.</p>
        )}
      </div>
    </div>
  );
};

export default TaskCalendar;
