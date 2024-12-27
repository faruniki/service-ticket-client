import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../components/Form/Navbar";
import Footer from "../../components/Form/Footer";
import { fetchTicketType, fetchTicketStatus, fetchProfile } from "./fetch";

export default function SurveyFormPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [ticketType, setTicketType] = useState([]);
  const [ticketStatus, setTicketStatus] = useState([]);
  const [profile, setProfile] = useState([]);
  const params = useParams();

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchTicketType(cookies, setTicketType);
      fetchTicketStatus(cookies, (statusData) => {
        setTicketStatus(statusData);
  
        if (statusData && statusData.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            ticket_status_id: statusData[0].id,
          }));
        }
      });
      fetchProfile(cookies, (profileData) => {
        setProfile(profileData);
  
        if (profileData && profileData.project) {
          setFormData((prevData) => ({
            ...prevData,
            project_id: profileData.project.id,
          }));
        }
      });
    }, 200);
  
    return () => {
      clearTimeout(handler);
    };
  }, [cookies]);

  const [dataSurveyMeta, setDataSurveyMeta] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    project_id: "",
    email: "",
    name: "",
    email_answer: "",
    ticket_type_id: "",
    ticket_status_id: "",
    problem_date: "",
    problem_title: "",
    problem_description: "",
    problem_suggestion: "",
    upload_attachment: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const createTicket = async (event) => {
    event.preventDefault();

    try {
      const { upload_attachment, ...data } = formData;
      const payload = new FormData();

      Object.keys(data).forEach((key) => {
        payload.append(key, data[key]);
      });

      if (upload_attachment) {
        payload.append("upload_attachment", upload_attachment);
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/ticket`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Ticket created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });

        setIsSubmitted(true);
      } else {
        throw new Error("Server responded with an error");
      }
    } catch (error) {
      toast.error(
        `Failed to create ticket: ${error.response ? error.response.data.message : error.message}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        }
      );
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      project_id: "",
      email: "",
      name: "",
      email_answer: "",
      ticket_type_id: "",
      ticket_status_id: "",
      problem_date: "",
      problem_title: "",
      problem_description: "",
      problem_suggestion: "",
      upload_attachment: null,
    });
  };

  return (
    <section>
      <Navbar />
      <div className="top-container">
        <div className="top-left">
          <p className="left">Service Center</p>
        </div>
      </div>

      <div className="asesmen">
        <p>IT Service Ticket</p>
      </div>

      <center>
        <div className="main-title">{dataSurveyMeta?.survey?.survey_title}</div>
      </center>

      {isSubmitted ? (
        <div
          className="success-message"
          style={{ height: "24vh", margin: "20vh 0" }}
        >
          <h2 style={{ textAlign: "center" }}>
            Terimakasih sudah mengisi form!
          </h2>
          <h4 style={{ textAlign: "center", marginTop: 10, fontWeight: 400 }}>
            Kami akan segera memberikan response secepat mungkin
          </h4>
          <h5
            onClick={resetForm}
            style={{ textAlign: "center", marginTop: 60, cursor: "pointer" }}
            className="isi-ulang"
          >
            Isi Ulang Form
          </h5>
        </div>
      ) : (
        <form
          onSubmit={createTicket}
          style={{ marginBottom: "6%" }}
          className="form-service"
        >
          <div className="center-container">
            <div className="an-que">Email</div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="input-form"
              required
            />
          </div>

          <div className="center-container">
            <div className="an-que">Nama</div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="input-form"
              required
            />
          </div>

          <div className="center-container">
            <div className="an-que">Email</div>
            <div className="desc">
              Jawaban akan dikirimkan melalui Email ini
            </div>
            <input
              type="email"
              name="email_answer"
              value={formData.email_answer}
              onChange={handleInputChange}
              placeholder="Email for answer"
              className="input-form"
              required
            />
          </div>

          <div className="center-container">
            <div className="an-que">Tipe Ticket</div>
            <select
              className="select-form"
              name="ticket_type_id"
              value={formData.ticket_type_id}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled hidden>
                Select Ticket Type
              </option>
              {ticketType.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.title}
                </option>
              ))}
            </select>
          </div>

          <div className="center-container">
            <div className="an-que">Tanggal Permasalahan</div>
            <input
              type="date"
              name="problem_date"
              value={formData.problem_date}
              onChange={handleInputChange}
              className="date-form"
              required
            />
          </div>

          <div className="center-container">
            <div className="an-que">Judul Permasalahan</div>
            <input
              type="text"
              name="problem_title"
              value={formData.problem_title}
              onChange={handleInputChange}
              placeholder="Enter problem title"
              className="input-form"
              required
            />
          </div>

          <div className="center-container">
            <div className="an-que">Deskripsi Permasalahan</div>
            <textarea
              name="problem_description"
              value={formData.problem_description}
              onChange={handleInputChange}
              placeholder="Describe the problem"
              className="text-area-form"
              required
            ></textarea>
          </div>

          <div className="center-container">
            <div className="an-que">Saran Permasalahan</div>
            <textarea
              name="problem_suggestion"
              value={formData.problem_suggestion}
              onChange={handleInputChange}
              placeholder="Any suggestions?"
              className="text-area-form"
            ></textarea>
          </div>

          <div className="center-container">
            <div className="an-que">Upload Attachment</div>
            <input
              type="file"
              name="upload_attachment"
              onChange={handleFileChange}
              className="input-form"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            SUBMIT
          </button>
        </form>
      )}

      <Footer />
    </section>
  );
}
