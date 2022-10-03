import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const getNotifications = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${BASE_URL}/users/${username}/notifications`,
    config
  );

  return response.data;
};

export const getUnreadNotifications = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${BASE_URL}/users/${username}/notifications/unread`,
    config
  );

  return response.data;
};

export const readNotifications = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(
    `${BASE_URL}/users/${username}/notifications/read`,
    {},
    config
  );

  return response.data;
};

const notificationsService = {
  getNotifications,
  getUnreadNotifications,
  readNotifications,
}

export default notificationsService;