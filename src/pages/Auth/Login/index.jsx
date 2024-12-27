import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icons from "../../../images/logo-starcore-login.png";
import { useCookies } from "react-cookie";
import { fetchLogin, fetchProfile } from "../../Service";
import "./login.css";

export default function LoginPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [username_or_email, setUsername_or_email] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState({});
  const params = useParams();
  const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;

        const segments = pathname.split("/").filter(Boolean);
        const lastSegment = segments[segments.length - 1];

        if (lastSegment) {
            localStorage.setItem("lastPathSegment", lastSegment);
        }
    }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const message = await fetchLogin({ username_or_email, password });

    if (message.status === 200) {
      const accessToken = message.data.data.access_token;
      setCookie("access_token", accessToken);

      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      await fetchAndNavigate(accessToken);
    } else {
      toast.error(message.data.detail, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const fetchAndNavigate = async (accessToken) => {
    try {
      const profileMessage = await fetchProfile(accessToken);
      if (profileMessage.status === 200) {
        const userProfile = profileMessage.data.data;
        setProfile(userProfile);
      } else {
        throw new Error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      removeCookie("access_token", { path: "/" });
    }
  };

  return (
    <div className="main-container">
      <div className="container-left">
        <div className="left-title">
          <div>
            <img src={Icons} alt="Icon" className="left-icons" />
          </div>
          <div>
            <p className="left-title">
              StarCore <span className="left-title-span">Analytics</span>
            </p>
          </div>
        </div>
        <div className="left-form">
          <p>
            Silahkan <span>Login</span>
          </p>
          <form onSubmit={handleLogin}>
            <label>Username</label>
            <div className="label-spacing"></div>
            <input
              type="text"
              placeholder="Masukkan username"
              value={username_or_email}
              onChange={(e) => setUsername_or_email(e.target.value)}
            />
            <div className="input-spacing"></div>
            <label>Password</label>
            <div className="label-spacing"></div>
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div className="spacing"></div>
            <button type="submit">LOGIN</button>
          </form>
        </div>
      </div>
      <div className="container-right">
        <p className="right-small-title">Selamat Datang</p>
        <p className="right-bigger-title">
          Service Ticket hadir untuk menyediakan layanan <span>pelaporan</span>{" "}
          dengan kualitas terbaik guna mendukung kebutuhan{" "}
          <span>untuk suatu hal yang lain</span> pada sebuah proyek, dalam
          suasana yang efisien dan responsif sebagai bagian dari budaya{" "}
          <span>kolaborasi profesional.</span>
        </p>
      </div>
    </div>
  );
}
