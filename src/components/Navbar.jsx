import React from "react";

function Navbar({ theme, toggleTheme }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="logo-text">AutomaZap</span>
      </div>
      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "🌞 Claro" : "🌙 Escuro"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
