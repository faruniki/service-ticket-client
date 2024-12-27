import axios from "axios";

export const fetchTicketType = async (cookies, setTicketType) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/ticket_type`,
      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      }
    );
    if (response.status === 200) {
      setTicketType(response.data.data);
    } else {
      setTicketType([]);
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    setTicketType([]);
  }
};

export const fetchTicketStatus = async (cookies, setTicketStatus) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/ticket_status`,
      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      }
    );
    if (response.status === 200) {
      setTicketStatus(response.data.data);
    } else {
      setTicketStatus([]);
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    setTicketStatus([]);
  }
};

export const fetchProfile = async (cookies, setProfile) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/profile`, {
      headers: {
        Authorization: `Bearer ${cookies.access_token}`,
      },
    });

    if (response.status === 200) {
      setProfile(response.data.data);
    } else {
      setProfile([]);
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    setProfile([]);
  }
};