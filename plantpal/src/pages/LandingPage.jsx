import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-green-200/50 px-4 py-2 rounded-full mb-6">
                <Leaf className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">
                  Your Plant Care Companion
                </span>
              </div>

              <h1
                className="mb-6 text-gray-900 font-bold"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: "1.2" }}
              >
                Discover and care for your favorite plants
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Explore a world of beautiful plants and learn everything you need
                to keep them thriving. From beginners to experts, PlantPal is here to
                help.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/explore">
                  <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg gap-2 w-full sm:w-auto">
                    Explore Plants
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/favorites">
                  <Button
                    variant="outline"
                    className="border-2 border-green-500 text-green-600 hover:bg-green-100 px-8 py-6 text-lg gap-2 w-full sm:w-auto"
                  >
                    <Heart className="w-5 h-5" />
                    View Favorites
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1599727545192-c70e86f92684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBnYXJkZW4lMjBwbGFudHN8ZW58MXx8fHwxNzYwMzczOTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Beautiful indoor plants"
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-300 rounded-full opacity-50 blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-200 rounded-full opacity-50 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections can be added below with same Tailwind color scheme */}
    </div>
  );
};
