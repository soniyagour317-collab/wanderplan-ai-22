import React, { useState, useEffect } from 'react';
import { Trip } from '../../types';
import { useTrips } from '../../context/TripContext';
import { StickyNote, Save, CheckCircle2, Shield } from 'lucide-react';
import { Button } from '../ui/Button';

interface TripNotesProps {
  trip: Trip;
}

export const TripNotes: React.FC<TripNotesProps> = ({ trip }) => {
  const { updateTripNotes } = useTrips();
  const [notes, setNotes] = useState(trip.notes || '');
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    setNotes(trip.notes || '');
  }, [trip.notes]);

  const handleSave = () => {
    updateTripNotes(trip.id, notes);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-teal-600" />
          <h3 className="text-lg font-bold text-slate-900">Personal Travel Notes & Contacts</h3>
        </div>
        <Button variant="teal" size="sm" onClick={handleSave}>
          {savedStatus ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Notes</span>
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-slate-500">
        Record hotel confirmation codes, emergency contact numbers, flight gate reminders, or restaurant recommendations.
      </p>

      <textarea
        rows={6}
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Type important reminders, transit passes, or reservation codes here..."
        className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm leading-relaxed text-slate-800"
      />

      {/* Suggested Emergency Templates */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-600">
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <Shield className="w-4 h-4 text-teal-600" />
          <span>Quick Traveler Safety Tip</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-normal">
          Always save local emergency numbers (e.g. 110/119 in Japan, 112 in Europe, 911 in North America) and your embassy address in this note.
        </p>
      </div>
    </div>
  );
};
