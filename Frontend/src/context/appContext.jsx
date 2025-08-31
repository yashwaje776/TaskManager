import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const appContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [token, settoken] = useState(localStorage.getItem("token") || "");
  const [userData, setuserData] = useState(null);
  const [tasks, settasks] = useState([]);
  const backendUrl = "http://localhost:3000";
  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/tasks/get`, {
        headers: { token },
      });
      if (data.success) {
        settasks(data.tasks);
        console.log(data.tasks)
      }

    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${backendUrl}/api/tasks/delete/${taskId}`, {
        headers: { token },
      });
      settasks((prev) => prev.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const handleMarkComplete = async (taskId) => {
    try {
      const { data } = await axios.patch(
        `${backendUrl}/api/tasks/complete/${taskId}`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        settasks((prev) => prev.map((task) => (task._id === taskId ? data.task : task)));
        toast.success("Task marked as completed");
      }
    } catch (err) {
      toast.error("Failed to update task status");
    }
  };

  const signIn = async (formData) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/signIn`, formData);
      if (data.success) {
        settoken(data.token);
        localStorage.setItem("token", data.token);
        setuserData(data.user);
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign-in failed");
    }
  };

  const signUp = async (formData) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/signUp`, formData);
      if (data.success) {
        settoken(data.token);
        localStorage.setItem("token", data.token);
        setuserData(data.user);
        toast.success("Account created successfully");
        navigate("/");
      } else {
        toast.error(data.message || "Sign-up failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign-up failed");
    }
  };
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get`, {
        headers: { token },
      });
      if (data.success) {
        setuserData(data.user);
      }
    } catch (error) {
      toast.error("Failed to load user data");
    }
  };

  useEffect(() => {
    if (token) {
      getTasks();
      getUserData();
    }
  }, [token]);

  return (
    <appContext.Provider
      value={{
        signUp,
        signIn,
        userData,
        token,
        settoken,
        setuserData,
        backendUrl,
        navigate,
        handleDelete,
        handleMarkComplete,
        tasks,
        settasks,
        getUserData,
        getTasks,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
