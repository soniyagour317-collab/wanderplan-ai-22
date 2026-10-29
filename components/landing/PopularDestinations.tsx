import React, { useState } from 'react';
import { POPULAR_DESTINATIONS } from '../../data/destinationsData';
import { Destination } from '../../types';
import { DestinationCard } from '../destinations/DestinationCard';
import { DestinationDetailModal } from '../destinations/DestinationDetailModal';
import { Search, Compass } from 'lucide-react';

interface PopularDestinationsProps {
  onPlanTrip: (destination: Destination) => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({ onPlanTrip }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const regions = ['All', 'Asia', 'Europe', 'Americas', 'Africa', 'Middle East'];

  const filtered = POPULAR_DESTINATIONS.filter(dest => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200" id="explore">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4 text-teal-600" />
              <span>Destination Discovery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trending Worldwide Escapes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Curated locations with live cost forecasts, seasonal weather trends, and recommended culinary delights.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search cities, countries, or tags..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            />
          </div>
        </div>

        {/* Region Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {regions.map(r => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedRegion === r
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Destination Cards Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(dest => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSelect={d => setSelectedDestination(d)}
                onPlanTrip={onPlanTrip}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-sm">
              No destinations matching "{searchQuery}". Try searching for another country or region.
            </p>
          </div>
        )}

        {/* Detailed Modal View */}
        <DestinationDetailModal
          destination={selectedDestination}
          isOpen={Boolean(selectedDestination)}
          onClose={() => setSelectedDestination(null)}
          onPlanTrip={onPlanTrip}
        />
      </div>
    </section>
  );
};
