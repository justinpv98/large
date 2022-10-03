import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_API_URL}/auth`;

const register = async (user) => {
  const response = await axios.post(BASE_URL + "/register", user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (user) => {
  const response = await axios.post(BASE_URL + "/login", user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
};

const uploadAvatar = async (data, token) => {
  const { formData, username } = data;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/users/${username}/avatar`,
    formData,
    config
  );

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  uploadAvatar,
};

export default authService;
