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

export const fetchMessages = async (cookies, setMessages, ticket) => {
  try {
    const url = new URL(`${process.env.REACT_APP_API_URL}/api/v1/ticket_message/ticket-messages`);
    
    if (ticket) {
      url.searchParams.append('ticket_id', ticket);
    }

    const response = await axios.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${cookies.access_token}`,
      },
    });

    if (response.status === 200) {
      setMessages(response.data.data);
    } else {
      setMessages([]);
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    setMessages([]);
  }
};

export const fetchTicketById = async (cookies, setTickets, ticket) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/ticket/${ticket}`, {
      headers: {
        Authorization: `Bearer ${cookies.access_token}`,
      },
    });

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
