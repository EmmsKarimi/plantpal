import React, { createContext, useContext, useState } from 'react';

const PlantContext = createContext(undefined);

export const PlantProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (plantId) => {
    setFavorites((prev) => [...prev, plantId]);
  };

  const removeFromFavorites = (plantId) => {
    setFavorites((prev) => prev.filter((id) => id !== plantId));
  };

  const isFavorite = (plantId) => {
    return favorites.includes(plantId);
  };

  return (
    <PlantContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};

export const usePlantContext = () => {
  const context = useContext(PlantContext);
  if (context === undefined) {
    throw new Error('usePlantContext must be used within a PlantProvider');
  }
  return context;
};
