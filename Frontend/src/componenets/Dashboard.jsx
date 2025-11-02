import React, { useEffect, useState } from "react";
import { RefreshCw, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = ({ onLogout }) => {
  const [username, setUsername] = useState("");
  const [surveys, setSurveys] = useState([
    { id: 1, pid: "DM001", url: "https://poll.edgeopinions.com/survey/supplier-auth?uid=hzbk8WeXdnDM001", status: "TERMINATE" },
    { id: 2, pid: "DM012", url: "https://poll.edgeopinions.com/survey/supplier-auth?uid=absy5JkLpDM012", status: "QUOTA FULL" },
    { id: 3, pid: "DM008", url: "https://poll.edgeopinions.com/survey/supplier-auth?uid=po9zxKImDSDM008", status: "SURVEY CLOSED" },
    { id: 4, pid: "DM009", url: "https://poll.edgeopinions.com/survey/supplier-auth?uid=ghuK9LmOpDM009", status: "ACTIVE" },
    { id: 5, pid: "DM010", url: "https://poll.edgeopinions.com/survey/supplier-auth?uid=tyu4NmQwEDM010", status: "ACTIVE" },
    { id: 6, pid: "DM011", url: "https://poll.edgeopinions.com/survey/supplier-auth?uid=lkpR6QyTDN011", status: "QUOTA FULL" },
    { id: 7, pid: "DM013", url: "https://poll.edgeopinions.com/survey/supplier-auth?uid=mno8PwERDM013", status: "SURVEY CLOSED" },
    { id: 8, pid: "DM014", url: "https://poll.edgeopinions.com/survey/supplier-auth?uid=uvw7SxFZDM014", status: "ACTIVE" },
    { id: 9, pid: "DM015", url: "https://poll.edgeopinions.com/survey/supplier-auth?uid=qaz3WdRTDM015", status: "TERMINATE" },
    { id: 10, pid: "DM016", url: "https://poll.edgeopinions.com/survey/supplier-auth?uid=plm2KoYTDM016", status: "ACTIVE" },
  ]);

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (user) setUsername(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    onLogout(); // tell App.jsx to update auth state
  };

  const refreshData = () => {
    setSurveys((prev) => [...prev.sort(() => Math.random() - 0.5)]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "TERMINATE":
        return "bg-red-900/40 text-red-300 border border-red-700 shadow-red-900/40 shadow-sm";
      case "QUOTA FULL":
        return "bg-yellow-900/40 text-yellow-300 border border-yellow-700 shadow-yellow-900/40 shadow-sm";
      case "SURVEY CLOSED":
        return "bg-gray-800 text-gray-300 border border-gray-700 shadow-gray-900/40 shadow-sm";
      case "ACTIVE":
        return "bg-green-900/40 text-green-300 border border-green-700 shadow-green-900/40 shadow-sm";
      default:
        return "bg-gray-700 text-gray-300 border border-gray-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gray-900 text-gray-100 p-8"
    >
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-extrabold tracking-wide text-indigo-400 drop-shadow-md"
        >
          Data Matrix & Insights
        </motion.h1>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-gray-400 text-sm">
            Logged in as <span className="text-indigo-400 font-medium">{username}</span>
          </span>

          <motion.button
            onClick={refreshData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, rotate: -10 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <RefreshCw size={18} />
            Refresh
          </motion.button>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="overflow-x-auto rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-md"
      >
        <table className="min-w-full border-collapse bg-gray-800/90 rounded-2xl">
          <thead className="uppercase text-sm font-semibold bg-gray-700 text-gray-100">
            <tr>
              <th className="py-3 px-5 text-left">#</th>
              <th className="py-3 px-5 text-left">PID</th>
              <th className="py-3 px-5 text-left">URL</th>
              <th className="py-3 px-5 text-left">STATUS</th>
            </tr>
          </thead>

          <AnimatePresence>
            <tbody>
              {surveys.map((survey) => (
                <motion.tr
                  key={survey.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: survey.id * 0.05 }}
                  className="border-b border-gray-700 hover:bg-gray-700/40 transition-colors duration-200"
                >
                  <td className="py-3 px-5">{survey.id}</td>
                  <td className="py-3 px-5 font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer">
                    {survey.pid}
                  </td>
                  <td className="py-3 px-5 truncate max-w-[500px]">
                    <a
                      href={survey.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-indigo-400 hover:underline"
                    >
                      {survey.url}
                    </a>
                  </td>
                  <td className="py-3 px-5">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 250 }}
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold tracking-wide ${getStatusColor(
                        survey.status
                      )}`}
                    >
                      {survey.status}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </AnimatePresence>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
