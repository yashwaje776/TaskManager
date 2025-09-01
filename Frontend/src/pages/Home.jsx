import React, { useContext, useState } from "react";
import { appContext } from "../context/appContext";
import TaskCard from "../component/TaskCard";
import { FiList } from "react-icons/fi";
import { RiArrowDropUpLine } from "react-icons/ri";

import { RiArrowDropDownLine } from "react-icons/ri";


const Home = () => {
  const { tasks } = useContext(appContext);
  const [filter, setFilter] = useState("all");
  const [priority, setpriority] = useState("0");
  const [display, setdisplay] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    if (priority !== "0") {
      if (filter === "pending")
        return task.status === "pending" && task.priority === priority;
      if (filter === "completed")
        return task.status === "completed" && task.priority === priority;
      else {
        return task.priority === priority;
      }
    } else {
      if (filter === "pending") return task.status === "pending";
      if (filter === "completed") return task.status === "completed";
      else {
        return true;
      }
    }
  });
  const handle = () => {
    if (display) {
      setdisplay(!display);
      setpriority("0");
    } else {
      setdisplay(!display);
      setpriority("0");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1  p-6 min-h-screen overflow-y-auto bg-gray-50">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Tasks</h1>
          <p className="text-gray-600 mt-1">Filter tasks by status</p>
        </header>

        <div className="flex gap-4 mb-8" aria-label="Task filters">
          {["pending", "completed", "all"].map((status) => {
            const isActive = filter === status;
            const colors = {
              pending: "bg-blue-600 text-white",
              completed: "bg-green-600 text-white",
              all: "bg-black text-white",
            };
            return (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-5 py-2 rounded-lg font-semibold transition
                  ${
                    isActive
                      ? colors[status]
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  }`}
                aria-pressed={isActive}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            );
          })}
        </div>
        <div className="flex ">

        <button
          className="px-4 py-2 rounded-lg font-semibold transition flex gap-2 bg-gray-200 items-center mb-2 text-center"
          onClick={() => handle()}
        >
          
          Priority
          {!display &&<RiArrowDropDownLine className="w-8 h-6"/>}
          {display &&<RiArrowDropUpLine className="w-8 h-6" />}


          
        </button>
        </div>
        {display && (
          <div className="flex gap-4 mb-8" aria-label="Task filters">
            {["low", "medium", "high"].map((status) => {
              const isActive = priority === status;
              return (
                <button
                  key={status}
                  onClick={() => setpriority(status)}
                  className={`px-5 py-2 rounded-lg font-semibold transition
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  }`}
                  aria-pressed={isActive}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              );
            })}
          </div>
        )}

        {filteredTasks.length > 0 ? (
          <section
            className="space-y-6"
            aria-live="polite"
            aria-relevant="additions removals"
          >
            {filteredTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </section>
        ) : (
          <p className="text-gray-500 text-center mt-20 text-lg">
            No tasks found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
