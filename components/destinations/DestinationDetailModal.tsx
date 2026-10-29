import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Destination } from '../../types';
import { Star, MapPin, Utensils, Landmark, Sparkles, Check } from 'lucide-react';

interface DestinationDetailModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onPlanTrip: (destination: Destination) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  isOpen,
  onClose,
  onPlanTrip
}) => {
  if (!destination) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${destination.name}, ${destination.country}`}
      subtitle={`Comprehensive travel guide and highlights in ${destination.region}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        
        {/* Destination Hero Banner */}
        <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-teal-500 text-white px-2.5 py-1 rounded-md">
                {destination.region}
              </span>
              <h3 className="text-2xl font-extrabold mt-1 tracking-tight">
                {destination.name}
              </h3>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-teal-300" />
                <span>{destination.country}</span>
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-right">
              <div className="flex items-center gap-1 text-amber-300 text-sm font-bold">
                <Star className="w-4 h-4 fill-amber-300" />
                <span>{destination.rating}</span>
              </div>
              <span className="text-[10px] text-slate-200">
                ({destination.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Avg Cost</span>
            <span className="text-sm font-bold text-slate-900 mt-0.5 block">
              ${destination.avgCostPerDay} / person / day
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Best Season</span>
            <span className="text-xs font-bold text-slate-800 mt-0.5 block line-clamp-1">
              {destination.bestSeason}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Vibe & Style</span>
            <span className="text-xs font-bold text-teal-700 mt-0.5 block line-clamp-1">
              {destination.tags.join(', ')}
            </span>
          </div>
        </div>

        {/* Narrative Description */}
        <div>
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            About {destination.name}
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* Top Attractions & Famous Culinary Dishes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Attractions */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
              <Landmark className="w-4 h-4 text-teal-600" />
              <span>Must-Visit Landmarks</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {destination.topAttractions.map(att => (
                <li key={att} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{att}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Famous Food */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
              <Utensils className="w-4 h-4 text-amber-600" />
              <span>Signature Culinary Flavors</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {destination.famousFood.map(food => (
                <li key={food} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <span>{food}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Back
          </Button>
          <Button
            variant="teal"
            size="lg"
            onClick={() => {
              onClose();
              onPlanTrip(destination);
            }}
            className="shadow-md shadow-teal-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Itinerary for {destination.name}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
