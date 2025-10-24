import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Heart, Home, Search } from 'lucide-react';
import { usePlantContext } from '../contexts/PlantContext';

export const Header = () => {
  const location = useLocation();
  const { favorites } = usePlantContext();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Leaf className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span
              className="text-xl md:text-2xl text-primary"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              PlantPal
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2 md:gap-6">
            <Link
              to="/"
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-secondary text-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              <Home className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/explore"
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-colors ${
                isActive('/explore')
                  ? 'bg-secondary text-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Explore</span>
            </Link>
            <Link
              to="/favorites"
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-colors relative ${
                isActive('/favorites')
                  ? 'bg-secondary text-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
