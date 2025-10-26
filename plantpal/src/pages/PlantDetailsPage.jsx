import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { mockPlants } from '../data/plants';
import { usePlantContext } from '../contexts/PlantContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const PlantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = usePlantContext();

  const plant = mockPlants.find(p => p.id === Number(id));

  if (!plant) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300 flex items-center justify-center">
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

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(plant.id);
    } else {
      addToFavorites(plant.id);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-200 text-gray-500 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300">
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
                <p className="text-sm text-gray-500 mb-6">
                  Family: {plant.family_common_name}
                </p>
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

            {/* Tabs section unchanged, you can add Tabs, Card, etc., using same Tailwind color scheme */}
          </div>
        </div>
      </div>
    </div>
  );
};
