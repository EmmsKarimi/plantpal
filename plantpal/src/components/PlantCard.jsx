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
    if (favorite) {
      removeFromFavorites(plant.id);
    } else {
      addToFavorites(plant.id);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-primary border-green-200';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-border">
      <Link to={`/plant/${plant.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <ImageWithFallback
            src={plant.image_url}
            alt={plant.common_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
              favorite
                ? 'bg-primary text-white'
                : 'bg-white/90 text-muted-foreground hover:bg-white hover:text-primary'
            }`}
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
          </button>
          <div className="absolute bottom-3 left-3">
            <Badge className={getDifficultyColor(plant.difficulty)}>
              {plant.difficulty}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4 md:p-5">
          <h3 className="mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {plant.common_name}
          </h3>
          <p className="text-sm text-muted-foreground italic mb-3 line-clamp-1">
            {plant.scientific_name}
          </p>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {plant.description}
          </p>
          <Button className="w-full bg-primary hover:bg-primary/90 text-white gap-2">
            <Eye className="w-4 h-4" />
            View Details
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};
