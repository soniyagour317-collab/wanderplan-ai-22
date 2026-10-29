import React, { useState } from 'react';
import { Sparkles, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onOpenCreateTrip: (destination?: string) => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCreateTrip,
  onExploreClick
}) => {
  const [quickCity, setQuickCity] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenCreateTrip(quickCity.trim());
  };

  return (
    <div className="relative overflow-hidden bg-navy-900 text-white">
      {/* Full-width Destination Hero Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
          alt="Scenic mountain adventure journey"
          className="w-full h-full object-cover object-center opacity-40 scale-105 animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
        
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold backdrop-blur-md mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation AI Travel Planning</span>
        </div>

        {/* Hero Headline & Tagline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Your journey,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-emerald-400">
            intelligently planned.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Craft hyper-personalized day-by-day travel itineraries in seconds. Complete with curated attractions, real-time weather forecasts, smart budgets, and interactive packing lists.
        </p>

        {/* Interactive Quick Search Bar */}
        <div className="mt-10 max-w-3xl mx-auto bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/20 text-slate-800">
          <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <MapPin className="w-5 h-5 text-teal-600 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={quickCity}
                onChange={e => setQuickCity(e.target.value)}
                placeholder="Where do you want to wander? (e.g. Kyoto, Amalfi Coast, Bali)..."
                className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base font-medium rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <Button
              type="submit"
              variant="teal"
              size="lg"
              className="w-full sm:w-auto shadow-lg shadow-teal-600/30 font-bold px-8 py-3.5 text-sm sm:text-base shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan with AI</span>
            </Button>
          </form>

          {/* Quick Trending Searches */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Popular:</span>
            {['Kyoto', 'Amalfi Coast', 'Bali', 'Paris', 'Santorini', 'Banff'].map(city => (
              <button
                key={city}
                type="button"
                onClick={() => onOpenCreateTrip(city)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 transition-colors font-medium text-slate-700"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Value Highlights */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-teal-400 font-extrabold text-xl">100% Free</div>
            <div className="text-xs text-slate-300 mt-0.5">No subscription required</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-teal-400 font-extrabold text-xl">Offline Saved</div>
            <div className="text-xs text-slate-300 mt-0.5">LocalStorage persistence</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-teal-400 font-extrabold text-xl">Gemini LLM</div>
            <div className="text-xs text-slate-300 mt-0.5">Serverless API boundary</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-teal-400 font-extrabold text-xl">PDF Export</div>
            <div className="text-xs text-slate-300 mt-0.5">Printable travel brochure</div>
          </div>
        </div>
      </div>
    </div>
  );
};
