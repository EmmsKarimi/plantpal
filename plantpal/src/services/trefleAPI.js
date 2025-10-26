// src/services/trefleApi.js
import axios from 'axios';

const API_KEY = 'usr-yAA3zNvMOAUOevT-e8HrXwVTce1XfR-yozjAlsM9BEQ'; // Replace with your key
const BASE_URL = 'https://trefle.io/api/v1';

export const fetchPlants = async (query = '', page = 1, perPage = 20) => {
  try {
    const response = await axios.get(`${BASE_URL}/plants`, {
      params: {
        token: API_KEY,
        q: query,
        page,
        per_page: perPage,
      },
    });
    return response.data.data; // Trefle nests the results under data.data
  } catch (error) {
    console.error('Error fetching plants:', error);
    return [];
  }
};
