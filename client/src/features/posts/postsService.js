import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const createPost = async (postData, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${BASE_URL}/users/${userId}/posts`,
    postData,
    config
  );

  return response.data;
};

export const getPost = async (postId, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BASE_URL}/posts/${postId}`, config)

  return response.data
}

export const deletePost = async(postId, token) => {
  const config = {
     headers: {
       Authorization: `Bearer ${token}`
     },
   };
 
   const response = await axios.delete(`${BASE_URL}/posts/${postId}`, config)
 
   return response.data
 }

export const likePost = async(postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  const response = await axios.post(`${BASE_URL}/posts/${postId}/like`, {}, config)

  return response.data
}

export const unlikePost = async(postId, token) => {
 const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  const response = await axios.delete(`${BASE_URL}/posts/${postId}/like`, config)

  return response.data
}

export const searchPosts = async(query) => {

  const response = await axios.get(`${BASE_URL}/search`, {params: {query}})

  return response.data
}

const postsService = {
  createPost,
  getPost,
  deletePost,
  likePost,
  unlikePost,
  searchPosts
};

export default postsService;
