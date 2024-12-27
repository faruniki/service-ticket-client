import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import GridOnIcon from "@mui/icons-material/GridOn";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
// external
import Navbar from "../../../components/Admin/Navbar";
import Footer from "../../../components/Form/Footer";
import { fetchProfile, fetchMessages, fetchTicketById } from "./fetch";

const containerStyle = {
  margin: "10px auto",
  padding: "0 20px",
  maxWidth: "98%",
};

const sectionStyle = {
  maxWidth: "960px",
  margin: "0 auto",
  padding: "16px",
};

const styles = {
  messageCard: {
    border: "1px solid #d0d7de",
    borderRadius: "6px",
    marginBottom: "16px",
  },
  infoCard: {
    border: "1px solid #d0d7de",
    borderRadius: "0px 0px 6px 6px",
    marginBottom: "16px",
  },
  header: {
    backgroundColor: "#f6f8fa",
    padding: "16px",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  authorSection: {
    display: "flex",
    gap: "8px",
  },
  avatar: {
    color: "#d0d7de",
    fontSize: "32px",
    color: "#3cbc51",
  },
  authorInfo: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flexWrap: "wrap",
  },
  issueInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "4px",
  },
  authorName: {
    fontWeight: "600",
    color: "#24292f",
  },
  timestamp: {
    color: "#57606a",
    fontSize: "14px",
  },
  moreButton: {
    background: "none",
    border: "none",
    padding: "4px",
    cursor: "pointer",
    color: "#57606a",
    display: "flex",
    alignItems: "center",
  },
  date: {
    padding: "16px",
    color: "#24292f",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap",
    opacity: 0.5,
    fontSize: "14px",
  },
  content: {
    padding: "16px",
    color: "#24292f",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap",
  },
  dropdownChat: {
    position: "absolute",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    width: "120px",
    zIndex: 100,
  },
  dropdownChatItem: {
    padding: "8px 12px",
    cursor: "pointer",
    textAlign: "left",
  },
  dropdownChatItemHover: {
    backgroundColor: "#f0f0f0",
  },
};

const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/ticket_message/ticket-message`;

const getFileIcon = (file) => {
  const fileExtension = file.split(".").pop();
  switch (fileExtension) {
    case "pdf":
      return <PictureAsPdfIcon style={{ color: "#D32F2F" }} />;
    case "doc":
    case "docx":
      return <InsertDriveFileIcon style={{ color: "#1976D2" }} />;
    case "xls":
    case "xlsx":
      return <GridOnIcon style={{ color: "#388E3C" }} />;
    case "txt":
      return <TextSnippetIcon style={{ color: "#F57C00" }} />;
    default:
      return <DescriptionIcon />;
  }
};

const MessageCard = ({
  comment,
  onUpdate,
  uploadAttachment,
  isAuthor = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState("");

  const startEdit = () => {
    setEditMessage(comment.message);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    await onUpdate(comment.id, editMessage);
    setIsEditing(false);
  };

  const date = new Date(comment.created_at);
  const formattedDate = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const renderAttachment = (attachment) => {
    if (attachment && /\.(jpg|jpeg|png|gif)$/i.test(attachment)) {
      return (
        <div style={styles.content}>
          <img
            src={attachment}
            alt="Ticket Screenshot"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "4px",
              border: "solid 1px #D9D9D9",
            }}
          />
        </div>
      );
    } else if (attachment) {
      return (
        <div style={styles.content}>
          <a
            href={attachment}
            download
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#1f3520",
              padding: "20px",
              backgroundColor: "#FAFAFA",
              border: "solid 1px #D9D9D9",
              borderRadius: "4px",
            }}
          >
            {getFileIcon(attachment)}
            <span style={{ marginLeft: "10px" }}>Download File</span>
          </a>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={styles.messageCard}>
      <div style={styles.header}>
        <div style={styles.authorSection}>
          <AccountCircleIcon style={styles.avatar} />
          <div style={styles.authorInfo}>
            <span style={styles.authorName}>{comment.user_id}</span>
            <span style={styles.timestamp}>commented on {formattedDate}</span>
          </div>
        </div>
        {isAuthor && (
          <div>
            <button
              style={styles.moreButton}
              onClick={() => (isEditing ? setIsEditing(false) : startEdit())}
            >
              {isEditing ? (
                <CloseIcon style={{ fontSize: "16px"}} />
              ) : (
                <EditIcon style={{ fontSize: "16px" }} />
              )}
            </button>
          </div>
        )}
      </div>
      {isEditing ? (
        <div style={styles.content}>
          <ReactQuill
            theme="snow"
            value={editMessage}
            onChange={setEditMessage}
          />
        </div>
      ) : (
        <>
          <ReactQuill value={comment.message} readOnly={true} theme="bubble" />
          {renderAttachment(uploadAttachment)}
        </>
      )}
      {isEditing && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
            padding: "16px",
          }}
        >
          <button
            style={{
              backgroundColor: "#3cbc51",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "500",
              padding: "4px 10px",
              borderRadius: "4px",
              border: "solid 0px",
              display: "block",
              cursor: "pointer",
            }}
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

const InfoCard = ({
  messages,
  time,
  title,
  author,
  description,
  suggestion,
  ticketStatus,
  writer,
  ticketId,
  uploadAttachment,
  problemDate,
}) => {
  const date = new Date(time);
  const formattedDate = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const dateProblem = new Date(problemDate);
  const formattedProblem = dateProblem.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const renderAttachment = (attachment) => {
    if (attachment && /\.(jpg|jpeg|png|gif)$/i.test(attachment)) {
      return (
        <div style={styles.content}>
          <img
            src={attachment}
            alt="Ticket Screenshot"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "4px",
              border: "solid 1px #D9D9D9",
            }}
          />
        </div>
      );
    } else if (attachment) {
      return (
        <div style={styles.content}>
          <a
            href={attachment}
            download
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#1f3520",
              padding: "20px",
              backgroundColor: "#FAFAFA",
              border: "solid 1px #D9D9D9",
              borderRadius: "4px",
            }}
          >
            {getFileIcon(attachment)}
            <span style={{ marginLeft: "10px" }}>Download File</span>
          </a>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#3cbc51",
          color: "white",
          minHeight: "60px",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: "14px", opacity: 0.8 }}>
            {author} created this ticket on {formattedDate} · {messages.length}{" "}
            messages
          </div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>{title}</div>
        </div>

        <button
          style={{
            backgroundColor: "#f6f8fa",
            color: "#1f3520",
            border: "none",
            borderRadius: "4px",
            padding: "6px 12px",
            fontWeight: "bold",
            marginLeft: "auto",
            textTransform: "capitalize",
          }}
        >
          {ticketStatus}
        </button>
      </div>
      <div style={styles.infoCard}>
        <div style={styles.header}>
          <div style={styles.authorSection}>
            <AccountCircleIcon style={styles.avatar} />
            <div style={styles.authorInfo}>
              <span style={styles.authorName}>{writer}</span>
              <span style={styles.timestamp}>#{ticketId}</span>
            </div>
          </div>
          <div style={styles.issueInfo}>
            <div style={styles.date}>
              The issue happened on {formattedProblem}
            </div>
          </div>
        </div>
        <div style={styles.content}>{description}</div>
        <div style={styles.content}>{suggestion}</div>
        {renderAttachment(uploadAttachment)}
      </div>
    </>
  );
};

export default function Messages() {
  const { ticket } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [profile, setProfile] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchProfile(cookies, setProfile);
    }, 200);

    if (ticket) {
      fetchMessages(cookies, setMessages, ticket);
      fetchTicketById(cookies, setTickets, ticket);
    }
    return () => {
      clearTimeout(handler);
    };
  }, [cookies, ticket]);

  const updateMessage = async (messageId, updatedMessage) => {
    try {
      const response = await axios.put(
        `${apiUrl}/${messageId}`,
        `message=${encodeURIComponent(updatedMessage)}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Message updated successfully!");
        fetchMessages(cookies, setMessages, ticket);
      } else {
        toast.error("Failed to update message.");
      }
    } catch (error) {
      console.error("Failed to update message: ", error);
      toast.error("Error updating message!");
    }
  };

  const deleteData = async (commentId) => {
    try {
      const response = await axios.delete(`${apiUrl}/${commentId}`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Ticket deleted successfully!");
        fetchMessages(cookies, setMessages, ticket);
      } else {
        toast.error("Failed to delete ticket.");
      }
    } catch (error) {
      console.error("Failed to delete ticket: ", error);
      toast.error("Error deleting ticket!");
    }
  };

  const handleMessageChange = (content) => {
    setMessage(content);
  };

  const handleFileChange = (event) => {
    setAttachment(event.target.files[0]);
  };

  const removeAttachment = () => {
    setAttachment(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("ticket_id", ticket);
    formData.append("user_id", profile.id);
    formData.append("message", message);
    if (attachment) {
      formData.append("upload_attachment", attachment);
    }
    if (!message) {
      toast.error("Message must be filled in!");
      return null;
    }

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Message created successfully!");
        fetchMessages(cookies, setMessages, ticket);
        setMessage("");
        setAttachment(null);
      } else {
        toast.error("Failed to create message.");
      }
    } catch (error) {
      console.error("Failed to create message: ", error);
      toast.error("Error creating message!");
    }
  };

  return (
    <>
      <Navbar profile={profile}/>
      <div style={containerStyle}>
        <div style={sectionStyle}>
          <button
            style={{
              backgroundColor: "#3cbc51",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "500",
              padding: "4px 10px",
              borderRadius: "2px",
              border: "solid 0px",
              display: "block",
              cursor: "pointer",
              marginBottom: "10px",
            }}
            onClick={() => (window.location.href = `/admin/ticket`)}
          >
            {"<"} Back to Ticket
          </button>
          <InfoCard
            messages={messages}
            time={tickets.created_at}
            author={tickets.user_id}
            writer={tickets.name}
            ticketId={tickets.ticket_number}
            title={tickets.problem_title}
            description={tickets.problem_description}
            suggestion={tickets.problem_suggestion}
            ticketStatus={tickets?.ticket_status?.title}
            problemDate={tickets?.problem_date}
            uploadAttachment={tickets.upload_attachment}
          />
          {messages.map((comment, index) => {
            return (
              <MessageCard
                key={index}
                comment={comment}
                onDelete={deleteData}
                onUpdate={updateMessage}
                isAuthor={comment.user_id === profile.id}
                uploadAttachment={comment.upload_attachment}
              />
            );
          })}
          <form onSubmit={handleSubmit}>
            <ReactQuill
              theme="snow"
              value={message}
              onChange={handleMessageChange}
            />
            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <label
                style={{
                  display: "inline-block",
                  backgroundColor: "#E7E7E7",
                  color: "#565757",
                  fontSize: "12px",
                  fontWeight: "500",
                  padding: "2px 12px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                Choose File
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="*"
                  style={{ display: "none" }}
                />
              </label>
              {attachment && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontSize: "12px" }}>{attachment.name}</span>
                  <CloseIcon
                    onClick={removeAttachment}
                    style={{
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  />
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <button
                style={{
                  backgroundColor: "#3cbc51",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "500",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  border: "solid 0px",
                  display: "block",
                  cursor: "pointer",
                }}
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
