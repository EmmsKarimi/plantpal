import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { usePlantContext } from '../contexts/PlantContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import axios from 'axios';

const API_KEY = "usr-yAA3zNvMOAUOevT-e8HrXwVTce1XfR-yozjAlsM9BEQ";
const BASE_URL = "https://trefle.io/api/v1/plants";

export const PlantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = usePlantContext();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/${id}`, {
          params: { token: API_KEY }
        });
        const data = response.data.data;
        setPlant({
          id: data.id,
          common_name: data.common_name || "Unknown",
          scientific_name: data.scientific_name || "",
          family_common_name: data.family_common_name || "",
          image_url: data.image_url || "https://via.placeholder.com/400x300?text=No+Image",
          difficulty: ['Easy', 'Moderate', 'Hard'][Math.floor(Math.random() * 3)], // placeholder
          description: data.common_name || "No description",
          watering: data.main_species?.specifications?.watering || "No info",
          sunlight: data.main_species?.specifications?.light || "No info",
          soil: data.main_species?.specifications?.soil || "No info",
          temperature: data.main_species?.growth?.temperature_minimum || "No info",
          humidity: data.main_species?.growth?.humidity_minimum || "No info"
        });
      } catch (err) {
        console.error("Error fetching plant:", err);
        setPlant(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPlant();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading plant details...</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-gray-900 text-2xl font-semibold">Plant not found</h2>
          <Link to="/explore">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3">
              Back to Explore
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(plant.id);
  const handleFavoriteClick = () => favorite ? removeFromFavorites(plant.id) : addToFavorites(plant.id);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-200 text-gray-500 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-600 hover:text-green-600 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl sticky top-24">
              <ImageWithFallback
                src={plant.image_url}
                alt={plant.common_name}
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className={getDifficultyColor(plant.difficulty)}>
                  {plant.difficulty}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h1 className="mb-2 text-gray-900 text-3xl font-bold">{plant.common_name}</h1>
              <p className="text-xl text-gray-600 italic mb-4">{plant.scientific_name}</p>
              {plant.family_common_name && (
                <p className="text-sm text-gray-500 mb-6">Family: {plant.family_common_name}</p>
              )}

              <Button
                onClick={handleFavoriteClick}
                className={`gap-2 px-6 py-3 ${
                  favorite
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-white border-2 border-green-500 text-green-600 hover:bg-green-100'
                }`}
              >
                <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
                {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Watering:</h2>
              <p className="text-gray-600 mb-4">{plant.watering}</p>
              <h2 className="text-lg font-semibold mb-2">Sunlight:</h2>
              <p className="text-gray-600 mb-4">{plant.sunlight}</p>
              <h2 className="text-lg font-semibold mb-2">Soil:</h2>
              <p className="text-gray-600 mb-4">{plant.soil}</p>
              <h2 className="text-lg font-semibold mb-2">Temperature:</h2>
              <p className="text-gray-600 mb-4">{plant.temperature}</p>
              <h2 className="text-lg font-semibold mb-2">Humidity:</h2>
              <p className="text-gray-600 mb-4">{plant.humidity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
