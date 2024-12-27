import React, { useState, useEffect } from "react";
import "../../style.css";
import Icons from "../../images/logo-starcore.png";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { fetchProfile } from "../fetchData";

export default function Navbar({profile}) {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    removeCookie("access_token", { path: "/" });
  };

  return (
    <div className={`navbar-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <nav className="navbar">
        <button className="hamburger-button" onClick={toggleSidebar}>
          <MenuIcon sx={{ fontSize: 30, color: "white" }} />
          <img src={Icons} alt="Icon" className="icon-navbar" />
          <div className="navbar-logo-left">Starcore Analytics</div>
        </button>
        <div className="navbar-logo"></div>
        <div className="navbar-drop">
          <div className="navbar-profile">
            <span className="menu-title">{profile?.username}</span>
          </div>
          <div className="navbar-menu" onClick={toggleDropdown}>
            <AccountCircleIcon sx={{ fontSize: 40 }} />
            <p className="navbar-username">{profile?.name}</p>
            <ul className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
              <li>
                <a
                  onClick={() => {
                    toast.success("logout successfully");
                    setTimeout(() => {
                      handleLogout();
                    }, 3000);
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
          <li>
            <a
              onClick={() => {
                window.location.replace("/admin/ticket");
              }}
            >
              Ticket
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                window.location.replace("/admin/user");
              }}
            >
              User
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
