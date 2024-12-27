import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: 15,
    marginBottom: 20,
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
    color: "#333",
  },
  bodyCell: {
    color: "#666",
  },
});

export const TableUsers = ({ data, deleteData, openEditModal, profile }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            {profile?.role?.code == "ADM" && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role.name}</TableCell>
              {profile?.role?.code == "ADM" && (
                <TableCell style={{ display: "flex", gap: "10px" }}>
                  <button
                    style={{
                      backgroundColor: "#D6C61A",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      border: "solid 0px",
                      display: "block",
                      cursor: "pointer",
                    }}
                    onClick={() => openEditModal(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      backgroundColor: "#E44C4C",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      border: "solid 0px",
                      display: "block",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteData(user.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
