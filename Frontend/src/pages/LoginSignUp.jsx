import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { appContext } from "../context/appContext";

const LoginSignupForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const { signUp, signIn } = useContext(appContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!email || !password || (isSignup && !name)) {
      alert("Please fill all fields.");
      return;
    }

    if (isSignup) {
      signUp(formData);
    } else {
      signIn(formData);
    }

    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="bg-gradient-to-br from-rose-100 via-orange-100 to-yellow-50 rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center text-3xl font-semibold mb-6">
          {isSignup ? "Signup Form" : "Login Form"}
        </div>

        <div className="flex mb-6 bg-gray-200 rounded-full relative overflow-hidden">
          <button
            className={`w-1/2 py-2 text-center font-medium z-10 transition duration-300 ${
              !isSignup ? "text-white" : "text-black"
            }`}
            onClick={() => setIsSignup(false)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-center font-medium z-10 transition duration-300 ${
              isSignup ? "text-white" : "text-black"
            }`}
            onClick={() => setIsSignup(true)}
          >
            Signup
          </button>
          <div
            className={`absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-orange-400 via-rose-400 to-red-300 rounded-full transition-all duration-500 ${
              isSignup ? "translate-x-full" : ""
            }`}
          />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
              required
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {!isSignup && (
            <div className="text-sm text-right">
              <a href="#" className="text-orange-500 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-3 rounded-md hover:bg-orange-500 transition"
          >
            {isSignup ? "Signup" : "Login"}
          </button>

          <div className="text-center text-sm">
            {isSignup ? "Already have an account?" : "Not a member?"}{" "}
            <a
              href="#"
              className="text-orange-500 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                setIsSignup(!isSignup);
              }}
            >
              {isSignup ? "Login now" : "Signup now"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignupForm;
