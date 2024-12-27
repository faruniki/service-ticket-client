import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Navbar from "../../../components/Admin/Navbar";
import Footer from "../../../components/Form/Footer";
import { fetchTicket, fetchProfile } from "./fetch";
import { TableTicket } from "./Table/TableTicket";

const containerStyle = {
  margin: "10px auto",
  padding: "0 20px",
  maxWidth: "98%",
};

const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/ticket`;

export default function Ticket() {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [tickets, setTickets] = useState([]);
  const [profile, setProfile] = useState([]);

  //   const [title, setTitle] = useState("");
  //   const [subjectTicket, setSubjectTicket] = useState("");
  //   const [descriptionTicket, setDescriptionTicket] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchTicket(cookies, setTickets);
      fetchProfile(cookies, setProfile);
    }, 200);
    return () => {
      clearTimeout(handler);
    };
  }, [cookies]);

  const deleteData = async (selectedId) => {
    try {
      const response = await axios.delete(`${apiUrl}/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Ticket deleted successfully!");
        fetchTicket(cookies, setTickets);
      } else {
        toast.error("Failed to delete ticket.");
      }
    } catch (error) {
      console.error("Failed to delete ticket: ", error);
      toast.error("Error deleting ticket!");
    }
  };

  return (
    <>
      <Navbar profile={profile}/>
      <div style={containerStyle}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            onClick={() => window.location.replace("/form")}
          >
            Go To Form
          </button>
        </div>
        <TableTicket data={tickets} deleteData={deleteData} />
      </div>
      <Footer />
    </>
  );
}
