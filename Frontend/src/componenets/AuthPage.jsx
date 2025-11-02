import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, LogIn } from "lucide-react";
import axios from "axios";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username: email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("authUser", email);
        onLoginSuccess();
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-gray-900 to-gray-950 blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-gray-800/80 border border-gray-700 rounded-3xl shadow-2xl p-8 backdrop-blur-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-400 drop-shadow-lg">
            Data Matrix & Insights
          </h1>
          <p className="text-gray-400 text-sm mt-2 tracking-wide">
            Welcome back! Log in to access your dashboard.
          </p>
        </div>

        {/* Login Form */}
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Username</label>
            <div className="flex items-center bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5">
              <Mail size={18} className="text-indigo-400 mr-2" />
              <input
                type="text"
                placeholder="Enter your username (e.g. DM012)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent w-full outline-none text-gray-200 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <div className="flex items-center bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5">
              <Lock size={18} className="text-indigo-400 mr-2" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full outline-none text-gray-200 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-lg font-semibold transition-all duration-300 shadow-lg shadow-indigo-900/40"
          >
            <LogIn size={20} /> Login
          </motion.button>
        </motion.form>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Only authorized users can log in. Contact admin for access.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
