import React from 'react';
import { Destination } from '../../types';
import { useTrips } from '../../context/TripContext';
import { Star, Heart, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
  onPlanTrip: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelect,
  onPlanTrip
}) => {
  const { toggleFavorite, isFavorite } = useTrips();
  const favorited = isFavorite(destination.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
      
      {/* Cover Image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

        {/* Region Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
          {destination.region}
        </span>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            toggleFavorite(destination.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
            favorited
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
          }`}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
        </button>

        {/* Bottom image overlay stats */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div>
            <h3 className="text-lg font-extrabold tracking-tight drop-shadow-sm">
              {destination.name}
            </h3>
            <p className="text-xs text-slate-200 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-teal-300" />
              <span>{destination.country}</span>
            </p>
          </div>

          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{destination.rating}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {destination.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Avg. Daily</span>
            <span className="text-sm font-extrabold text-slate-900">
              ${destination.avgCostPerDay} <span className="text-xs font-normal text-slate-500">/ day</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onSelect(destination)}
            >
              Details
            </Button>
            <Button
              variant="teal"
              size="sm"
              onClick={() => onPlanTrip(destination)}
            >
              <span>Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
