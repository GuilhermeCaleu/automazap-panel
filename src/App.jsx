import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Contacts from "./pages/Contacts";
import Rules from "./pages/Rules";
import Settings from "./pages/Settings";

function useAuth() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("autozap_user");
    return raw ? JSON.parse(raw) : null;
  });

  function login(username, password) {
    if (!username || !password) return false;
    const data = { username };
    localStorage.setItem("autozap_user", JSON.stringify(data));
    setUser(data);
    return true;
  }

  function logout() {
    localStorage.removeItem("autozap_user");
    setUser(null);
  }

  return { user, login, logout };
}

function ProtectedRoute({ children, user }) {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function App() {
  const [theme, setTheme] = useState("dark");
  const auth = useAuth();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <div className="app-container">
      {auth.user && (
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onLogout={auth.logout}
          user={auth.user}
        />
      )}
      <div className="layout">
        {auth.user && <Sidebar />}
        <main className="content">
          <Routes>
            <Route
              path="/login"
              element={<Login onLogin={auth.login} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute user={auth.user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inbox"
              element={
                <ProtectedRoute user={auth.user}>
                  <Inbox />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <ProtectedRoute user={auth.user}>
                  <Contacts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rules"
              element={
                <ProtectedRoute user={auth.user}>
                  <Rules />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute user={auth.user}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
