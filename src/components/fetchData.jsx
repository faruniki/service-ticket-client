import axios from "axios";

export const fetchProfile = async (cookies, setProfile) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      }
    );
    setProfile(response.data.data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
