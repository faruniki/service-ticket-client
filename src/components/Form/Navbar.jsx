import React, { useState, useEffect } from "react";
import "../../style.css";
import Icons from "../../images/logo-starcore.png";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { fetchProfile } from "../fetchData";

export default function Navbar({}) {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    removeCookie("access_token", { path: "/" });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchProfile(cookies, setProfile);
    }, 200);
    return () => {
      clearTimeout(handler);
    };
  }, [cookies]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Icons} alt="Icon" className="icon-navbar" />
        <div className="navbar-logo-left">Starcore Analytics</div>
      </div>
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
                  window.location.replace("/admin/ticket");
                }}
              >
                Ticket
              </a>
            </li>
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
  );
}
