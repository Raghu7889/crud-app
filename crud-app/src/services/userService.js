import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    // Check if error response is available
    if (error.response && error.response.status === 409) {
      throw new Error("User already exists");
    } else {
      throw new Error(
        error.response ? error.response.data.message : "Registration failed"
      );
    }
  }
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const getUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/api/users/${id}`);
    return response.data;
  } catch (err) {
    throw new Error("Failed to delete user");
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user: " + error.message);
  }
};

// Update a user by ID
export const updateUser = async (id, userData) => {
  try {
    await axios.put(`${API_URL}/users/${id}`, userData);
  } catch (error) {
    throw new Error("Failed to update user: " + error.message);
  }
};
