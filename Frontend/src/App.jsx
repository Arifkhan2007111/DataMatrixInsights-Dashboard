import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./componenets/Dashboard";
import LoginPage from "./componenets/AuthPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    setIsAuthenticated(!!user);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Dashboard onLogout={() => setIsAuthenticated(false)} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
          )
        }
      />
    </Routes>
  );
}

export default App;
