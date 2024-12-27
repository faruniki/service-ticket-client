import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useCookies } from "react-cookie";
import axios from "axios";

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

const getBackgroundColor = (status) => {
  switch (status) {
    case "open":
      return "#F3C741";
    case "in_progress":
      return "#4CAF50";
    case "waiting_for_customer":
      return "#FF9800";
    case "waiting_for_support":
      return "#03A9F4";
    case "closed":
      return "#9E9E9E";
    case "reopened":
      return "#673AB7";
    case "on_hold":
      return "#FFC107";
    case "cancelled":
      return "#F44336";
    default:
      return "#FFFFFF";
  }
};

const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/ticket`;

export const TableTicket = ({ data, deleteData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const classes = useStyles();
  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [ticketDetails, setTicketDetails] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenImage(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImage(false);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {/* <TableCell className={classes.headerCell}>Project</TableCell> */}
              <TableCell className={classes.headerCell}>Name</TableCell>
              <TableCell className={classes.headerCell}>Title</TableCell>
              <TableCell className={classes.headerCell}>Description</TableCell>
              <TableCell className={classes.headerCell}>Type</TableCell>
              <TableCell className={classes.headerCell}>Status</TableCell>
              {/* <TableCell className={classes.headerCell}>Image</TableCell> */}
              <TableCell className={classes.headerCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {/* <TableCell className={classes.bodyCell}>
                  {row.project_id}
                </TableCell> */}
                <TableCell className={classes.bodyCell}>{row.name}</TableCell>
                <TableCell className={classes.bodyCell}>
                  {row.problem_title}
                </TableCell>
                <TableCell className={classes.bodyCell}>
                  {row.problem_description}
                </TableCell>
                <TableCell className={classes.bodyCell}>
                  {row.ticket_type.title}
                </TableCell>
                <TableCell className={classes.bodyCell}>
                  <p
                    style={{
                      backgroundColor: getBackgroundColor(
                        row.ticket_status.title
                      ),
                      color: "#FFF",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderRadius: "4px",
                      padding: "4px",
                      width: "fit-content",
                    }}
                  >
                    {row.ticket_status.title.replace("_", " ")}
                  </p>
                </TableCell>
                {/* <TableCell className={classes.bodyCell}>
                  <img
                    src={row.upload_attachment}
                    alt="Screenshot"
                    style={{ width: 50, height: 50, cursor: "pointer" }}
                    onClick={() => handleImageClick(row.upload_attachment)}
                  />
                </TableCell> */}
                <TableCell className={classes.bodyCell} style={{display: "flex", gap: "10px"}}>
                  <button
                    style={{
                      backgroundColor: "#4C95E4",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      border: "solid 0px",
                      display: "block",
                      cursor: "pointer",
                    }}
                    onClick={() => window.location.href = `/admin/messages/${row.id}`}                  >
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openImage} onClose={handleCloseImageDialog}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Zoomed"
            style={{ width: "100%", height: "auto", maxWidth: "500px" }}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "flex-start" }}>
          <button
            onClick={handleCloseImageDialog}
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
              marginLeft: "15px",
              marginBottom: "15px",
            }}
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};
