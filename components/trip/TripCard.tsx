import React, { useState } from 'react';
import { Trip } from '../../types';
import { useTrips } from '../../context/TripContext';
import { Calendar, MapPin, Users, Trash2, Copy, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface TripCardProps {
  trip: Trip;
  onOpenTrip: (tripId: string) => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onOpenTrip }) => {
  const { deleteTrip, duplicateTrip } = useTrips();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const totalCost = Object.values(trip.budget).reduce((a, b) => a + b, 0);

  const statusColors = {
    Upcoming: 'bg-teal-50 text-teal-800 border-teal-200',
    'In Progress': 'bg-amber-50 text-amber-800 border-amber-200',
    Completed: 'bg-slate-100 text-slate-800 border-slate-200'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
      <div>
        {/* Cover Photo */}
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
          <img
            src={trip.coverImage}
            alt={trip.destination}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

          {/* Status Badge */}
          <span
            className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-lg border backdrop-blur-md ${
              statusColors[trip.status]
            }`}
          >
            {trip.status}
          </span>

          {/* AI engine badge */}
          {trip.isAiGenerated && (
            <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-300" />
              <span>{trip.generatorSource === 'gemini-live' ? 'Gemini AI' : 'Smart Plan'}</span>
            </span>
          )}

          {/* Destination overlay */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="text-lg font-bold tracking-tight drop-shadow-sm line-clamp-1">
              {trip.title}
            </h3>
            <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-teal-300" />
              <span>{trip.destination}</span>
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{trip.days.length} Days</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{trip.travelers} Traveler(s)</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2 text-slate-500 text-[11px]">
              <span>Dates: {trip.startDate} to {trip.endDate}</span>
            </div>
          </div>

          {/* Budget stats */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Est. Budget</span>
              <span className="font-extrabold text-slate-900">${totalCost.toLocaleString()}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Style</span>
              <span className="font-bold text-teal-700">{trip.travelStyle}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => duplicateTrip(trip.id)}
            title="Duplicate trip"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteConfirmOpen(true)}
            title="Delete trip"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <Button
          variant="teal"
          size="sm"
          onClick={() => onOpenTrip(trip.id)}
          className="shadow-sm"
        >
          <span>Open Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Delete Itinerary?"
        subtitle="Are you sure you want to remove this trip? This action cannot be undone."
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Deleting <strong>"{trip.title}"</strong> will permanently clear its daily itinerary, scheduled activities, and budget records from your session.
          </p>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                deleteTrip(trip.id);
                setDeleteConfirmOpen(false);
              }}
            >
              Delete Trip
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
