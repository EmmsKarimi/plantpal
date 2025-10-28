import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { PlantCard } from '../components/PlantCard';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { usePlants } from '../hooks/usePlants'; // ✅ our new hook

export const ExplorePage = () => {
  const { plants, loading, error } = usePlants(); // fetch API or fallback
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filteredPlants = useMemo(
    () =>
      difficultyFilter === 'all'
        ? plants.filter(
            (p) =>
              p.common_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : plants.filter(
            (p) =>
              (p.common_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
              p.difficulty === difficultyFilter
          ),
    [plants, searchQuery, difficultyFilter]
  );

  if (loading)
    return <p className="text-center py-16">Loading plants...</p>;

  return (
    <div className="min-h-screen bg-white">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="mb-3 text-gray-900 font-bold text-3xl">Explore Plants</h1>
          <p className="text-lg text-gray-600">Discover beautiful plants and learn how to care for them</p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search by name or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-base"
              />
            </div>

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
            Showing {filteredPlants.length} {filteredPlants.length === 1 ? 'plant' : 'plants'}
          </div>
        </div>

        {/* Plants Grid */}
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
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};
