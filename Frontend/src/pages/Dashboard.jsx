import React, { useContext } from "react";
import { appContext } from "../context/appContext";
import { FaTasks, FaCheckCircle, FaClock } from "react-icons/fa";
import Home from "./Home";

const Dashboard = () => {
  const { tasks } = useContext(appContext);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  const cardData = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <FaTasks className="text-blue-600 w-10 h-10" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: <FaCheckCircle className="text-green-600 w-10 h-10" />,
      bgColor: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: <FaClock className="text-yellow-600 w-10 h-10" />,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
    },
  ];

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cardData.map(({ title, value, icon, bgColor, textColor }) => (
          <div
            key={title}
            className={`${bgColor} p-6 rounded-xl shadow-lg flex items-center space-x-6 hover:shadow-2xl transition-shadow duration-300`}
          >
            <div>{icon}</div>
            <div>
              <h2 className={`text-lg font-semibold ${textColor}`}>{title}</h2>
              <p className="text-4xl font-extrabold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>
      <Home></Home>
    </div>
  );
};

export default Dashboard;
