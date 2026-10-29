import React, { useState } from 'react';
import { Trip, Activity } from '../../types';
import { ActivityCard } from './ActivityCard';
import { ActivityModal } from './ActivityModal';
import { useTrips } from '../../context/TripContext';
import { Plus, Compass } from 'lucide-react';
import { Button } from '../ui/Button';

interface DayItineraryViewProps {
  trip: Trip;
}

export const DayItineraryView: React.FC<DayItineraryViewProps> = ({ trip }) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const { addActivity, updateActivity, deleteActivity, reorderActivities } = useTrips();

  const currentDay = trip.days.find(d => d.dayNumber === selectedDayNumber) || trip.days[0];

  const handleOpenAdd = () => {
    setEditingActivity(null);
    setIsActivityModalOpen(true);
  };

  const handleOpenEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setIsActivityModalOpen(true);
  };

  const handleSaveActivity = (data: Omit<Activity, 'id'> | Activity) => {
    if ('id' in data) {
      updateActivity(selectedDayNumber, data as Activity);
    } else {
      addActivity(selectedDayNumber, data);
    }
  };

  // Day date display formatter
  const formatDayDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Day Selector Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {trip.days.map(day => {
          const isSelected = day.dayNumber === selectedDayNumber;
          return (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDayNumber(day.dayNumber)}
              className={`shrink-0 flex flex-col items-start px-4 py-2.5 rounded-2xl border transition-all text-left ${
                isSelected
                  ? 'bg-navy-900 border-navy-900 text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className={`text-xs font-bold ${isSelected ? 'text-teal-400' : 'text-slate-400'}`}>
                Day {day.dayNumber}
              </span>
              <span className="text-sm font-semibold tracking-tight">
                {formatDayDate(day.date)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Header Card */}
      {currentDay && (
        <div className="bg-gradient-to-r from-teal-50 via-white to-slate-50 p-6 rounded-2xl border border-teal-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider">
              <Compass className="w-4 h-4 text-teal-600" />
              <span>Day {currentDay.dayNumber} Focus</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {currentDay.theme}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {formatDayDate(currentDay.date)} • {currentDay.activities.length} planned experiences
            </p>
          </div>

          <Button variant="teal" size="sm" onClick={handleOpenAdd}>
            <Plus className="w-4 h-4" />
            <span>Add Activity</span>
          </Button>
        </div>
      )}

      {/* Activities List */}
      {currentDay && currentDay.activities.length > 0 ? (
        <div className="space-y-4">
          {currentDay.activities.map((activity, idx) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              isFirst={idx === 0}
              isLast={idx === currentDay.activities.length - 1}
              onEdit={() => handleOpenEdit(activity)}
              onDelete={() => deleteActivity(currentDay.dayNumber, activity.id)}
              onMoveUp={() => reorderActivities(currentDay.dayNumber, idx, idx - 1)}
              onMoveDown={() => reorderActivities(currentDay.dayNumber, idx, idx + 1)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-500 text-sm mb-3">No activities planned yet for Day {selectedDayNumber}.</p>
          <Button variant="outline" size="sm" onClick={handleOpenAdd}>
            <Plus className="w-4 h-4" />
            <span>Add First Activity</span>
          </Button>
        </div>
      )}

      {/* Activity Add/Edit Modal */}
      {currentDay && (
        <ActivityModal
          isOpen={isActivityModalOpen}
          onClose={() => setIsActivityModalOpen(false)}
          dayNumber={currentDay.dayNumber}
          initialActivity={editingActivity}
          onSave={handleSaveActivity}
        />
      )}
    </div>
  );
};
