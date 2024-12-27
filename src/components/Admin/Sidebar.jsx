import React from "react";
import "../../style.css";

export default function Sidebar({ isOpen }) {
  return (
    <div className={isOpen ? "sidebar open" : "sidebar"}>
      <ul className="sidebar-items">
        <li className="sidebar-item">Dashboard</li>
        <li className="sidebar-item">Projects</li>
        <li className="sidebar-item">Analytics</li>
        <li className="sidebar-item">Settings</li>
      </ul>
    </div>
  );
}
