import axios from "axios";

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

export const fetchTicket = async (cookies, setTickets) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/ticket`,
      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      }
    );
    if (response.status === 200) {
      setTickets(response.data.data);
    } else {
      setTickets([]);
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    setTickets([]);
  }
};
