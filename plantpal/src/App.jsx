import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlantProvider } from './contexts/PlantContext';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { ExplorePage } from './pages/ExplorePage';
import { PlantDetailsPage } from './pages/PlantDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';

export default function App() {
  return (
    <PlantProvider>
      <Router>
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/plant/:id" element={<PlantDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </Router>
    </PlantProvider>
  );
}
