// src/services/trefleAPI.js
import axios from 'axios';
import { mockPlants } from '../data/plants';

const API_KEY = import.meta.env.VITE_TREFLE_API_KEY; // use env key
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

    const apiPlants = response.data.data.map((plant) => ({
      id: plant.id,
      common_name: plant.common_name || 'Unknown Plant',
      scientific_name: plant.scientific_name || 'Unknown',
      image_url: plant.image_url || 'https://via.placeholder.com/400x300?text=No+Image',
      description: plant.observations || 'No description available',
      watering: 'Refer to care guide',
      sunlight: 'Refer to care guide',
      soil: 'Refer to care guide',
      temperature: 'Refer to care guide',
      humidity: 'Refer to care guide',
      difficulty: 'Moderate', // default, can adjust if you want
      family_common_name: plant.family_common_name || 'Unknown',
    }));

    return apiPlants;
  } catch (error) {
    console.error('API fetch failed, using mock data', error);
    return mockPlants; // fallback
  }
};
