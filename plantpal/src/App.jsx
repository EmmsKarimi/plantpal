// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ExplorePage from "./pages/ExplorePage";
import PlantDetails from "./pages/PlantDetails";
import FavoritesPage from "./pages/FavoritesPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./index.css";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Header stays visible on all pages */}
          <Header />

          {/* Main app content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/plants/:id" element={<PlantDetails />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </main>

          {/* Footer stays visible on all pages */}
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
