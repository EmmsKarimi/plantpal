import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { mockPlants } from '../data/plants';
import { usePlantContext } from '../contexts/PlantContext';
import { PlantCard } from '../components/PlantCard';
import { Button } from '../components/ui/button';

export const FavoritesPage = () => {
  const { favorites } = usePlantContext();

  const favoritePlants = mockPlants.filter((plant) =>
    favorites.includes(plant.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="mb-3 text-foreground">My Favorites</h1>
          <p className="text-lg text-muted-foreground">
            Your personally curated collection of favorite plants
          </p>
        </div>

        {/* Favorites Grid or Empty State */}
        {favoritePlants.length > 0 ? (
          <>
            <div className="mb-6 text-sm text-muted-foreground">
              {favoritePlants.length}{' '}
              {favoritePlants.length === 1 ? 'plant' : 'plants'} saved
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {favoritePlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 md:py-24">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="mb-4 text-foreground">No favorites yet</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Start exploring plants and add your favorites to create your personal collection
            </p>
            <Link to="/explore">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 gap-2">
                Explore Plants
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
