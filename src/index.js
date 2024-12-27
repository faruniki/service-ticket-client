import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import LoginPage from "./pages/Auth/Login";
import HomePage from "./pages/Home";
import FormPage from "./pages/Form";

import Messages from "./pages/Admin/Messages";
import Ticket from "./pages/Admin/Ticket";
import UserPage from "./pages/Admin/User";

import ErrorPage from "./pages/ErrorPage";

const ProtectedRoute = ({ allowedRoles }) => {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!cookies.access_token) {
        let redirectUrl = "/";
        const lastPathSegment = localStorage.getItem("lastPathSegment");
        if (lastPathSegment) {
          redirectUrl = `/${lastPathSegment}`;
        }
        window.location.replace(redirectUrl);
      } else {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/v1/auth/profile`,
            {
              headers: { Authorization: `Bearer ${cookies.access_token}` },
            }
          );
          const userRole = response.data.data.role.code;
          setIsAuthorized(allowedRoles.includes(userRole));
        } catch (error) {
          toast.error("Authentication failed. Please log in again.");
          setIsAuthorized(false);
        } finally {
          setLoading(false);
        }
      }
    };

    checkAuth();
  }, [allowedRoles, cookies.access_token]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};

const LoginRedirect = () => {
  const [cookies] = useCookies(["access_token"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cookies.access_token) {
      const navigateBasedOnRole = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/v1/auth/profile`,
            {
              headers: { Authorization: `Bearer ${cookies.access_token}` },
            }
          );
          const userRole = response.data.data.role.code;

          const pathSegments = window.location.pathname
            .split("/")
            .filter(Boolean);
          const lastSegment =
            pathSegments.length > 0
              ? pathSegments[pathSegments.length - 1]
              : null;

          let baseRedirectUrl = "/form";
          if (!lastSegment) {
            const savedSegment = localStorage.getItem("lastPathSegment");
            if (savedSegment) {
              baseRedirectUrl += `/${savedSegment}`;
            }
          } else {
            baseRedirectUrl += `/${lastSegment}`;
          }

          if (userRole === "CLN") {
            window.location.href = baseRedirectUrl;
          } else if (userRole === "ADM") {
            window.location.href = "/admin/ticket";
          }
        } catch (error) {
          toast.error("Authentication failed. Please log in again.");
        } finally {
          setLoading(false);
        }
      };

      navigateBasedOnRole();
    } else {
      setLoading(false);
    }
  }, [cookies]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return <LoginPage />;
};

const FormRoute = () => {
  const [cookies] = useCookies(["access_token"]);
  const location = useLocation();

  const basePath = location.pathname.split("/")[1];
  const specificPath = location.pathname.split("/")[2];

  if (!cookies.access_token) {
    if (specificPath) {
      return <Navigate to={`/${specificPath}`} />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <FormPage />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRedirect />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:project",
    element: <LoginRedirect />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["ADM", "CLN"]} />,
    errorElement: <ErrorPage />,
    children: [
      { path: "messages", element: <Messages /> },
      { path: "messages/:ticket", element: <Messages /> },
      { path: "ticket", element: <Ticket /> },
      { path: "user", element: <UserPage /> },
    ],
  },
  {
    path: "/form",
    element: <FormRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/form/:project",
    element: <FormRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
