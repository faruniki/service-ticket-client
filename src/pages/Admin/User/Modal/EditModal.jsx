import React from "react";
import { Modal, Box, Typography, TextField, Checkbox, FormControlLabel } from "@mui/material";

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

function EditModal({
  isOpen,
  onClose,
  handleSubmit,
  setRoleId,
  setUsername,
  setEmail,
  setPassword,
  setIsActive,
  roleId,
  username,
  email,
  password,
  isActive,
}) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box sx={style}>
        <Typography id="edit-modal-title" variant="h6" component="h2">
          Edit User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Role"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            autoFocus
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
            fullWidth
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                name="isActive"
                color="primary"
              />
            }
            label="Active"
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
              onClick={onClose}
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
              Save Changes
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default EditModal;
