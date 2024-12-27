import axios from "axios";

export const fetchLogin = async (form) => {
  try {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/auth/login`;

    const response = await axios.post(apiUrl, form, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return response;
  } catch (e) {
    if (e.response.status == 400) {
      return e.response;
    } else {
      console.error('error fetching login :', e)
      return {
        code: 500,
        data: {
          detail: 'Something went wrong on login'
        }
      }
    }
  }
}

export const fetchProfile = async (accessToken) => {
  try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/auth/profile`;

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const jsonData = response;
      return jsonData;

  } catch (error) {
      console.error("Error fetching profile :", error);
      return [];
  }
};