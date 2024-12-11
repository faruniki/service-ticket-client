import React, { useState } from "react";
import "../../style.css";
import Icons from "../../images/logo-starcore.png";
import { toast } from "react-toastify";

export default function Navbar({ profile }) {
//   const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // removeCookie("access_token", { path: "/" });
    window.location.replace("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src={Icons}
          alt="Icon"
          className="icon-navbar"
        />
        <div className="navbar-logo-left">Starcore Analytics</div>
      </div>
      <div className="navbar-drop">
      <div className="navbar-profile">
          <span className="menu-title">Menu</span>
        </div>
        {/* <div className="navbar-menu" onClick={toggleDropdown}>
        {profile?.image_url && (
            <img src={profile?.image_url} alt={profile?.name} />
          )}

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
        </div> */}
      </div>
    </nav>
  );
}
