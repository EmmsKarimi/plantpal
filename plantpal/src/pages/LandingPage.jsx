import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import axios from 'axios';

const API_KEY = "usr-yAA3zNvMOAUOevT-e8HrXwVTce1XfR-yozjAlsM9BEQ";
const BASE_URL = "https://trefle.io/api/v1/plants";

export const LandingPage = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            token: API_KEY,
            page: 1,
            per_page: 6, // fetch 6 plants for hero section
          },
        });

        const mappedPlants = response.data.data.map((plant) => ({
          id: plant.id,
          common_name: plant.common_name || "Unknown",
          scientific_name: plant.scientific_name || "",
          image_url: plant.image_url || "https://via.placeholder.com/400x300?text=No+Image",
        }));

        setPlants(mappedPlants);
      } catch (err) {
        console.error("Error fetching plants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div className="min-h-screen bg-white"> {/* removed gradient */}
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full mb-6">
                <Leaf className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Your Plant Care Companion</span>
              </div>

              <h1
                className="mb-6 text-gray-900 font-bold"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: "1.2" }}
              >
                Discover and care for your favorite plants
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Explore a world of beautiful plants and learn everything you need to keep them thriving.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/explore">
                  <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg gap-2 w-full sm:w-auto">
                    Explore Plants
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/favorites">
                  <Button variant="outline" className="border-2 border-green-500 text-green-600 hover:bg-gray-100 px-8 py-6 text-lg gap-2 w-full sm:w-auto">
                    <Heart className="w-5 h-5" />
                    View Favorites
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Plant Images */}
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {loading ? (
                  <p className="text-center py-20 text-gray-500">Loading plants...</p>
                ) : (
                  plants.map((plant) => (
                    <ImageWithFallback
                      key={plant.id}
                      src={plant.image_url}
                      alt={plant.common_name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-gray-900">Why Choose PlantPal?</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Everything you need to become a successful plant parent
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="text-center p-6 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-3 text-gray-900">Extensive Database</h3>
              <p className="text-gray-500">
                Browse through hundreds of plant species with detailed care information and beautiful imagery.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-3 text-gray-900">Care Guides</h3>
              <p className="text-gray-500">
                Get expert advice on watering, sunlight, soil, and more to keep your plants healthy.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-3 text-gray-900">Save Favorites</h3>
              <p className="text-gray-500">
                Create your personal collection by saving your favorite plants for quick reference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-green-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 text-white">Ready to Start Your Plant Journey?</h2>
          <p className="text-lg md:text-xl mb-8">
            Join thousands of plant lovers discovering new species and learning to care for them properly.
          </p>
          <Link to="/explore">
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg gap-2">
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg text-green-600 font-semibold">PlantPal</span>
          </div>
          <p className="text-sm text-gray-500">© 2025 PlantPal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
