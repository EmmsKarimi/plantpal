import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { mockPlants } from '../data/plants';
import { PlantCard } from '../components/PlantCard';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filteredPlants = useMemo(() => {
    return mockPlants.filter((plant) => {
      const matchesSearch =
        plant.common_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDifficulty =
        difficultyFilter === 'all' || plant.difficulty === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, difficultyFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="mb-3 text-gray-900 font-bold text-3xl">
            Explore Plants
          </h1>
          <p className="text-lg text-gray-600">
            Discover beautiful plants and learn how to care for them
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search by name or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border-2 border-gray-300 focus:border-green-500 rounded-xl text-base"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="md:w-64">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="py-3 bg-white border-2 border-gray-300 rounded-xl text-base">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <SelectValue placeholder="Filter by difficulty" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredPlants.length}{' '}
            {filteredPlants.length === 1 ? 'plant' : 'plants'}
          </div>
        </div>

        {/* Cards Grid */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="mb-2 text-gray-900 font-semibold">No plants found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
