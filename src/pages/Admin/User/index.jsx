import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Navbar from "../../../components/Admin/Navbar";
import Footer from "../../../components/Form/Footer";
import { fetchUsers, fetchRoles, fetchProfile } from "./fetch";
import { TableUsers } from "./Table/TableUsers";
import CreateModal from "./Modal/CreateModal";
import EditModal from "./Modal/EditModal";

const containerStyle = {
  margin: "10px auto",
  padding: "0 20px",
  maxWidth: "98%",
};

const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/user`;

export default function UserPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [profile, setProfile] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [currentUserId, setCurrentUserId] = useState("");

  const [roleId, setRoleId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projectId, setProjectId] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUsers(cookies, setUsers);
      fetchRoles(cookies, setRoles);
      fetchProfile(cookies, setProfile);
    }, 200);
    return () => {
      clearTimeout(handler);
    };
  }, [cookies]);

  const deleteData = async (userId) => {
    try {
      const response = await axios.delete(`${apiUrl}/${userId}`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });
      if (response.status === 200) {
        toast.success("User deleted successfully!");
        fetchUsers(cookies, setUsers);
      } else if (response.status === 403) {
        const detail = await response.json();
        toast.error(detail.detail || "Failed to delete user.");
        fetchUsers(cookies, setUsers);
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      console.error("Failed to delete user: ", error);
      toast.error("Error deleting user!");
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const requestBody = new URLSearchParams();
      requestBody.append("role_id", roleId);
      requestBody.append("username", username);
      requestBody.append("email", email);
      requestBody.append("password", password);
      requestBody.append("project_id", projectId);

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });

      if (response.status === 201) {
        toast.success("User created successfully!");
        setModalOpen(false);
        setRoleId("");
        setUsername("");
        setEmail("");
        setPassword("");
        setProjectId("");
        fetchUsers(cookies, setUsers);
      } else {
        toast.error("Failed to create user.");
      }
    } catch (error) {
      console.error("Failed to create user: ", error);
      toast.error("Error creating user!");
    }
  };

  const openEditModal = async (userId) => {
    setCurrentUserId(userId);
    try {
      const response = await axios.get(`${apiUrl}/${userId}`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });
      const user = response.data.data;
      setRoleId(user.role.id);
      setUsername(user.username);
      setEmail(user.email);
      setIsActive(user.is_active);
      setEditModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch user data for editing: ", error);
      toast.error("Error fetching user data!");
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const requestBody = new URLSearchParams();
      requestBody.append("role_id", roleId);
      requestBody.append("username", username);
      requestBody.append("email", email);
      requestBody.append("password", password);
      requestBody.append("is_active", isActive);

      const response = await axios.patch(
        `${apiUrl}/${currentUserId}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("User updated successfully!");
        setEditModalOpen(false);
        fetchUsers(cookies, setUsers);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Failed to update user: ", error);
      toast.error("Error updating user!");
    }
  };

  return (
    <>
      <Navbar profile={profile} />
      <div style={containerStyle}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {(profile?.role?.code == "ADM") &&
          (
            <button
              style={{
                backgroundColor: "#3cbc51",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "500",
                padding: "6px 16px",
                borderRadius: "4px",
                border: "solid 0px",
                display: "block",
                cursor: "pointer",
              }}
              onClick={() => setModalOpen(true)}
            >
              Create User
            </button>
          )}
        </div>
        <TableUsers
          data={users}
          deleteData={deleteData}
          openEditModal={openEditModal}
          profile={profile}
        />
        <CreateModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          handleSubmit={createUser}
          roles={roles}
          setRoleId={setRoleId}
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
          setProjectId={setProjectId}
          roleId={roleId}
          username={username}
          email={email}
          password={password}
          projectId={projectId}
        />
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          handleSubmit={updateUser}
          setRoleId={setRoleId}
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
          setIsActive={setIsActive}
          roleId={roleId}
          username={username}
          email={email}
          password={password}
          isActive={isActive}
        />
      </div>
      <Footer />
    </>
  );
}
