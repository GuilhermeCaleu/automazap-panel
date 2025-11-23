import React from "react";

function Navbar({ theme, toggleTheme, onLogout, user }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="logo-text">AutomaZap PRO</span>
      </div>
      <div className="navbar-right">
        <span className="user-label">Olá, {user?.username}</span>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "🌞 Claro" : "🌙 Escuro"}
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Sair
        </button>
      </div>
    </header>
  );
}

export default Navbar;
