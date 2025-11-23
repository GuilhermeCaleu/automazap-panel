import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/inbox">Inbox</NavLink>
          </li>
          <li>
            <NavLink to="/contacts">Contatos</NavLink>
          </li>
          <li>
            <NavLink to="/rules">Regras do Bot</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Configurações</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
