import { useState, useEffect } from 'react';
import axios from 'axios';
import { mockPlants } from '../data/plants';

export const usePlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        // ✅ Fetch from local backend proxy
        const response = await axios.get('http://localhost:5000/api/plants', {
          params: { perPage: 20 }, // optional
        });

        console.log('Backend API Response:', response.data);

        setPlants(response.data);
      } catch (err) {
        console.error('Failed to fetch backend API:', err);
        setError('Failed to fetch API, using mock data');
        setPlants(mockPlants); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return { plants, loading, error };
};
