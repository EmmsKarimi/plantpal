// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express(); // ✅ define app
app.use(cors());

const TREFLE_API_KEY = process.env.TREFLE_API_KEY;
const BASE_URL = 'https://trefle.io/api/v1';

app.get('/api/plants', async (req, res) => {
  try {
    const perPage = req.query.perPage || 20;
    const response = await axios.get(`${BASE_URL}/plants`, {
      params: { token: TREFLE_API_KEY, per_page: perPage },
    });

    const plants = response.data.data.map((plant) => ({
      id: plant.id,
      common_name: plant.common_name || 'Unknown Plant',
      scientific_name: plant.scientific_name || 'Unknown',
      image_url: plant.image_url || 'https://via.placeholder.com/400x300?text=No+Image',
      description: plant.main_species?.common_name
        ? `Commonly known as ${plant.main_species.common_name}`
        : plant.scientific_name
        ? `Scientific name: ${plant.scientific_name}`
        : 'No description available',
      watering: 'Refer to care guide',
      sunlight: 'Refer to care guide',
      soil: 'Refer to care guide',
      temperature: 'Refer to care guide',
      humidity: 'Refer to care guide',
      difficulty: 'Moderate',
      family_common_name: plant.family_common_name || 'Unknown',
    }));

    res.json(plants);
  } catch (err) {
    console.error('Error fetching plants from Trefle:', err.message);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
