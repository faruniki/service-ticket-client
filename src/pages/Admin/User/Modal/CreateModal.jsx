import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Autocomplete } from "@mui/material";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function CreateModal({
  isOpen,
  onClose,
  handleSubmit,
  roles,
  setRoleId,
  setUsername,
  setEmail,
  setPassword,
  setProjectId,
  roleId,
  username,
  email,
  password,
  projectId,
}) {
  return (
    <Modal
      open={isOpen}
      onClose={() => {
        onClose();
        setRoleId("");
        setUsername("");
        setEmail("");
        setPassword("");
        setProjectId("");
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create New User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            options={roles}
            getOptionLabel={(option) => option.name}
            value={roles.find((role) => role.id === roleId) || null}
            onChange={(event, newValue) => {
              setRoleId(newValue ? newValue.id : "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Role"
                margin="normal"
                required
                fullWidth
                autoFocus
              />
            )}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Project"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <button
              type="button"
              style={{
                backgroundColor: "#fff",
                color: "#3cbc51",
                fontSize: "14px",
                fontWeight: "500",
                padding: "6px 16px",
                borderRadius: "4px",
                border: "solid 1px #3cbc51",
                display: "block",
                cursor: "pointer",
              }}
              onClick={() => {
                onClose();
                setRoleId("");
                setUsername("");
                setEmail("");
                setPassword("");
                setProjectId("");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
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
            >
              Create
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default CreateModal;
