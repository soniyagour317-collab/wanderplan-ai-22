import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useTrips } from '../../context/TripContext';
import { BudgetTier, TravelStyle, CreateTripInput } from '../../types';
import { MapPin, Calendar, Users, Sparkles, Car } from 'lucide-react';

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledDestination?: string;
  onSuccessTripCreated?: (tripId: string) => void;
}

export const CreateTripModal: React.FC<CreateTripModalProps> = ({
  isOpen,
  onClose,
  prefilledDestination = '',
  onSuccessTripCreated
}) => {
  const { createTrip, isGenerating } = useTrips();

  // Get tomorrow's date string as default start date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 7);
  const nextWeek = new Date(tomorrow);
  nextWeek.setDate(nextWeek.getDate() + 4);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [destination, setDestination] = useState(prefilledDestination || 'Kyoto, Japan');
  const [startDate, setStartDate] = useState(formatDate(tomorrow));
  const [endDate, setEndDate] = useState(formatDate(nextWeek));
  const [travelers, setTravelers] = useState<number>(2);
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('Moderate');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('Cultural');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Sightseeing',
    'Culture',
    'Food'
  ]);
  const [transportation, setTransportation] = useState('Public transit (Trains & Metro)');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Popular quick pick recommendations
  const popularPicks = ['Kyoto, Japan', 'Amalfi Coast, Italy', 'Bali, Indonesia', 'Paris, France', 'Santorini, Greece', 'Banff, Canada'];

  const interestOptions = [
    'Sightseeing',
    'Culture',
    'Food & Wine',
    'Nature & Outdoors',
    'Beaches',
    'Historic Sites',
    'Nightlife',
    'Shopping',
    'Photography',
    'Adventure & Hiking'
  ];

  const travelStyles: { style: TravelStyle; label: string; desc: string }[] = [
    { style: 'Relaxed', label: 'Relaxed', desc: 'Slow travel & downtime' },
    { style: 'Balanced', label: 'Balanced', desc: 'Highlights & comfort' },
    { style: 'Cultural', label: 'Cultural', desc: 'Temples, art & history' },
    { style: 'Foodie', label: 'Culinary', desc: 'Markets & top dining' },
    { style: 'Adventure', label: 'Adventure', desc: 'Active treks & sports' },
    { style: 'Fast-paced', label: 'Fast-paced', desc: 'See everything possible' }
  ];

  const budgetOptions: { tier: BudgetTier; label: string; sub: string }[] = [
    { tier: 'Budget', label: 'Backpacker / Budget', sub: '$50 - $90 / day' },
    { tier: 'Moderate', label: 'Comfortable / Moderate', sub: '$100 - $220 / day' },
    { tier: 'Luxury', label: 'Luxury & Boutique', sub: '$250+ / day' }
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!destination.trim()) {
      errs.destination = 'Please enter a target city or region.';
    }
    if (!startDate) {
      errs.startDate = 'Please choose a start date.';
    }
    if (!endDate) {
      errs.endDate = 'Please choose an end date.';
    }
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      errs.endDate = 'End date cannot be prior to start date.';
    }
    if (travelers < 1) {
      errs.travelers = 'Must have at least 1 traveler.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const input: CreateTripInput = {
      destination: destination.trim(),
      startDate,
      endDate,
      travelers,
      budgetTier,
      travelStyle,
      interests: selectedInterests,
      transportation
    };

    const newTrip = await createTrip(input);
    if (newTrip) {
      onClose();
      if (onSuccessTripCreated) {
        onSuccessTripCreated(newTrip.id);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Intelligent AI Itinerary"
      subtitle="Provide your journey parameters and WanderPlan AI will assemble your personalized daily itinerary."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination with Quick-Select Chips */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Where do you want to explore?
          </label>
          <div className="relative">
            <MapPin className="w-5 h-5 text-teal-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              placeholder="e.g. Kyoto, Japan or Amalfi Coast, Italy"
              className={`w-full pl-11 pr-4 py-3 text-sm rounded-xl border ${
                errors.destination ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-white'
              } focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium`}
            />
          </div>
          {errors.destination && (
            <p className="text-xs text-rose-500 mt-1">{errors.destination}</p>
          )}

          {/* Quick suggestions */}
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 font-medium mr-1">Trending:</span>
            {popularPicks.map(city => (
              <button
                key={city}
                type="button"
                onClick={() => setDestination(city)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                  destination === city
                    ? 'bg-teal-50 border-teal-300 text-teal-800 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Dates & Travelers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Start Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            {errors.startDate && (
              <p className="text-xs text-rose-500 mt-1">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              End Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            {errors.endDate && (
              <p className="text-xs text-rose-500 mt-1">{errors.endDate}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Travelers
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={travelers}
                onChange={e => setTravelers(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value={1}>1 Solo Explorer</option>
                <option value={2}>2 Couple / Pair</option>
                <option value={3}>3 Friends / Family</option>
                <option value={4}>4 Small Group</option>
                <option value={6}>6+ Large Gathering</option>
              </select>
            </div>
          </div>
        </div>

        {/* Budget Tier Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Budget Tier
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {budgetOptions.map(b => (
              <div
                key={b.tier}
                onClick={() => setBudgetTier(b.tier)}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  budgetTier === b.tier
                    ? 'border-teal-600 bg-teal-50/60 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900">{b.label}</span>
                  {budgetTier === b.tier && (
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                  )}
                </div>
                <p className="text-xs text-slate-500">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Style */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Pacing & Travel Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {travelStyles.map(s => (
              <button
                key={s.style}
                type="button"
                onClick={() => setTravelStyle(s.style)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  travelStyle === s.style
                    ? 'border-teal-600 bg-teal-50 text-teal-900 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <p className="text-sm font-bold">{s.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Interests Multi-Select */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Interests & Highlights
          </label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map(interest => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Transportation Preference */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Transit Preference
          </label>
          <div className="relative">
            <Car className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={transportation}
              onChange={e => setTransportation(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="Public transit (Trains & Metro)">Public transit (High-speed rail, Metro & City Buses)</option>
              <option value="Rental Car / Self Drive">Rental Car / Scenic Self Drive</option>
              <option value="Walking & Taxi / Rideshare">Walking & Ride-hailing (Uber/Grab/Taxis)</option>
              <option value="Private Guided Chauffeur">Private Guided Chauffeur & Transfers</option>
            </select>
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isGenerating}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="teal"
            size="lg"
            isLoading={isGenerating}
            className="shadow-md shadow-teal-600/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Itinerary</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
};
