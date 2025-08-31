import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiList, FiPlusCircle, FiLogOut } from "react-icons/fi";
import { appContext } from "../context/appContext";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {settoken}=useContext(appContext);

  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: <FiHome /> },
    { path: "/", label: "Tasks", icon: <FiList /> },
    { path: "/add-task", label: "Add Task", icon: <FiPlusCircle /> },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    settoken("")
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="px-6 py-8 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-10">Task Manager</h2>

          <nav className="flex flex-col gap-4 w-full">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded w-full transition
                  ${
                    isActive(link.path)
                      ? "bg-gray-700 font-semibold"
                      : "hover:bg-gray-700"
                  }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-white hover:bg-red-600 rounded transition"
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>

          <div className="text-xs text-gray-400 pt-4">
            © {new Date().getFullYear()} Task Manager
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
