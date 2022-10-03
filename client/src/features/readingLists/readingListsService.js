import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const getReadingList = async (readingListId) => {
  const response = await axios.get(
    `${BASE_URL}/reading-lists/${readingListId}/items`
  );

  return response.data;
};

export const getReadingLists = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${BASE_URL}/users/${username}/reading-lists`,
    config
  );

  return response.data;
};

export const createReadingList = async (userData, token) => {
  const { username } = userData;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${BASE_URL}/users/${username}/reading-lists`,
    userData,
    config
  );

  return response.data;
};

export const addReadingListItem = async (itemData, token) => {
  const { readingListId } = itemData;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${BASE_URL}/reading-lists/${readingListId}/items`,
    itemData,
    config
  );

  return response.data;
};

export const removeReadingListItem = async (itemData, token) => {
  const { readingListId, itemId } = itemData;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${BASE_URL}/reading-lists/${readingListId}/items/${itemId}`,
    config
  );

  return response.data;
};

const deleteReadingList = async (userData, token) => {
  const { username, readingListId } = userData;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }; 

  const response = await axios.delete(
    `${BASE_URL}/users/${username}/reading-lists/${readingListId}`,
    config
  );

  return response.data
};

const readingListsService = {
  getReadingList,
  getReadingLists,
  createReadingList,
  addReadingListItem,
  removeReadingListItem,
  deleteReadingList
};

export default readingListsService;
