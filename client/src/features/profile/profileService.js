import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const getProfile = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BASE_URL}/users/${username}`, config);

  return response.data;
};


export const getFollowers = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}/followers`);

  return response.data;
};

export const updateInfo = async (username, info, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(
    `${BASE_URL}/users/${username}`,
    { ...info },
    config
  );

  return response.data;
}

export const followUser = async (followerId, followingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${BASE_URL}/users/${followingId}/followers`,
    { followerId },
    config
  );

  return response.data;
};

export const unfollowUser = async (followerId, followingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${BASE_URL}/users/${followingId}/followers/${followerId}`,
    config
  );

  return response.data;
};

const profileService = {
  getProfile,
  getFollowers,
  followUser,
  unfollowUser,
};

export default profileService;
