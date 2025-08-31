import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginSignupForm from "./pages/LoginSignUp";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import { appContext } from "./context/appContext";
import SideBar from "./component/SideBar";
import TaskCalendar from "./component/Taskcalender";

const App = () => {
  const { token } = useContext(appContext);

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={3000} />
      {token && <SideBar />}
      <div
        className={`flex-1 min-h-screen bg-gray-100 ${
          token ? "md:ml-64" : ""
        } p-4`}
      >
        <Routes>
          <Route
            path="/sign"
            element={token ? <Navigate to="/" /> : <LoginSignupForm />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="*" element={<Navigate to={token ? "/" : "/sign"} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
