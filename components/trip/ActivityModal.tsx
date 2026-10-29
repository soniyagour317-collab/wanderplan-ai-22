import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Activity, ActivityPeriod, ActivityCategory } from '../../types';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  initialActivity?: Activity | null;
  onSave: (activityData: Omit<Activity, 'id'> | Activity) => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  isOpen,
  onClose,
  dayNumber,
  initialActivity,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 12:30 PM');
  const [period, setPeriod] = useState<ActivityPeriod>('Morning');
  const [location, setLocation] = useState('');
  const [estimatedCost, setEstimatedCost] = useState<number>(20);
  const [category, setCategory] = useState<ActivityCategory>('Sightseeing');
  const [description, setDescription] = useState('');
  const [tips, setTips] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialActivity) {
      setTitle(initialActivity.title);
      setTimeSlot(initialActivity.timeSlot);
      setPeriod(initialActivity.period);
      setLocation(initialActivity.location);
      setEstimatedCost(initialActivity.estimatedCost);
      setCategory(initialActivity.category);
      setDescription(initialActivity.description);
      setTips(initialActivity.tips || '');
    } else {
      setTitle('');
      setTimeSlot('10:00 AM - 12:30 PM');
      setPeriod('Morning');
      setLocation('');
      setEstimatedCost(20);
      setCategory('Sightseeing');
      setDescription('');
      setTips('');
    }
    setError('');
  }, [initialActivity, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) {
      setError('Please provide at least an activity title and location.');
      return;
    }

    if (initialActivity) {
      onSave({
        ...initialActivity,
        title: title.trim(),
        timeSlot: timeSlot.trim(),
        period,
        location: location.trim(),
        estimatedCost: Number(estimatedCost) || 0,
        category,
        description: description.trim() || 'Custom planned activity.',
        tips: tips.trim()
      });
    } else {
      onSave({
        title: title.trim(),
        timeSlot: timeSlot.trim(),
        period,
        location: location.trim(),
        estimatedCost: Number(estimatedCost) || 0,
        category,
        description: description.trim() || 'Custom planned activity.',
        tips: tips.trim()
      });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialActivity ? 'Edit Activity' : `Add Activity to Day ${dayNumber}`}
      subtitle="Customize your day schedule, cost estimate, and destination notes."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Activity Title
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Visit Senso-ji Temple & Traditional Street"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Time Period
            </label>
            <select
              value={period}
              onChange={e => setPeriod(e.target.value as ActivityPeriod)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Time Slot
            </label>
            <input
              type="text"
              value={timeSlot}
              onChange={e => setTimeSlot(e.target.value)}
              placeholder="09:00 AM - 11:30 AM"
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as ActivityCategory)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="Sightseeing">Sightseeing</option>
              <option value="Culture">Culture</option>
              <option value="Food">Food & Dining</option>
              <option value="Adventure">Adventure</option>
              <option value="Leisure">Leisure</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Est. Cost ($ USD)
            </label>
            <input
              type="number"
              min="0"
              value={estimatedCost}
              onChange={e => setEstimatedCost(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Location / Landmark
          </label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="e.g. Asakusa, Taito City"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What should travelers experience and see here?"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Travel Tip (Optional)
          </label>
          <input
            type="text"
            value={tips}
            onChange={e => setTips(e.target.value)}
            placeholder="e.g. Reserve tickets 3 days ahead, wear sunscreen"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="teal">
            {initialActivity ? 'Save Changes' : 'Add Activity'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
