import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { usePlantContext } from '../contexts/PlantContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const PlantCard = ({ plant }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = usePlantContext();
  const favorite = isFavorite(plant.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    favorite ? removeFromFavorites(plant.id) : addToFavorites(plant.id);
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
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-2xl">
      <Link to={`/plant/${plant.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 rounded-t-2xl">
          <ImageWithFallback
            src={plant.image_url}
            alt={plant.common_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
              favorite
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-white/90 text-gray-600 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
          </button>

          {/* Difficulty Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge className={getDifficultyColor(plant.difficulty)}>
              {plant.difficulty}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 md:p-5">
          <h3 className="mb-1 text-gray-900 group-hover:text-green-700 transition-colors line-clamp-1 font-semibold">
            {plant.common_name}
          </h3>
          <p className="text-sm text-gray-500 italic mb-3 line-clamp-1">
            {plant.scientific_name}
          </p>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {plant.description}
          </p>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
            <Eye className="w-4 h-4" />
            View Details
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};
