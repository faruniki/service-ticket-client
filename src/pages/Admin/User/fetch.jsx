import axios from "axios";

export const fetchUsers = async (cookies, setUsers) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/user`,
      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      }
    );
    if (response.status === 200) {
      setUsers(response.data.data);
    } else {
      setUsers([]);
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    setUsers([]);
  }
};


export const fetchRoles = async (cookies, setRoles) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/role`,
      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      }
    );
    if (response.status === 200) {
      setRoles(response.data.data);
    } else {
      setRoles([]);
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    setRoles([]);
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