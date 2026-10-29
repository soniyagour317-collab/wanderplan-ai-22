import React from 'react';
import { Activity } from '../../types';
import { Clock, MapPin, DollarSign, Lightbulb, Edit3, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface ActivityCardProps {
  activity: Activity;
  isFirst: boolean;
  isLast: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  isFirst,
  isLast,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown
}) => {
  const periodColors = {
    Morning: 'bg-amber-50 text-amber-800 border-amber-200',
    Afternoon: 'bg-sky-50 text-sky-800 border-sky-200',
    Evening: 'bg-indigo-50 text-indigo-800 border-indigo-200'
  };

  const categoryBadges: { [key: string]: 'teal' | 'slate' | 'amber' | 'emerald' | 'indigo' | 'rose' } = {
    Sightseeing: 'teal',
    Culture: 'indigo',
    Food: 'amber',
    Adventure: 'emerald',
    Leisure: 'slate',
    Transport: 'slate',
    Shopping: 'rose'
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all group relative">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
        
        {/* Time, Period & Category */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs px-2.5 py-1 rounded-lg font-bold border ${
              periodColors[activity.period] || 'bg-slate-100 text-slate-800'
            }`}
          >
            {activity.period}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{activity.timeSlot}</span>
          </div>
          <Badge variant={categoryBadges[activity.category] || 'slate'}>
            {activity.category}
          </Badge>
        </div>

        {/* Cost & Action Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          <span className="text-sm font-bold text-slate-900 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70">
            {activity.estimatedCost === 0 ? 'Free' : `$${activity.estimatedCost}`}
          </span>

          <div className="flex items-center gap-1 text-slate-400">
            {/* Reorder buttons */}
            <button
              onClick={onMoveUp}
              disabled={isFirst}
              title="Move activity earlier"
              className="p-1 rounded hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 disabled:hover:bg-transparent"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onMoveDown}
              disabled={isLast}
              title="Move activity later"
              className="p-1 rounded hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 disabled:hover:bg-transparent"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            {/* Edit */}
            <button
              onClick={onEdit}
              title="Edit activity"
              className="p-1 rounded hover:bg-slate-100 hover:text-teal-600 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            {/* Delete */}
            <button
              onClick={onDelete}
              title="Delete activity"
              className="p-1 rounded hover:bg-rose-50 hover:text-rose-600 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="pt-3 space-y-2">
        <h4 className="text-base font-bold text-slate-900 tracking-tight">
          {activity.title}
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          {activity.description}
        </p>

        {/* Location Pin */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium pt-1">
          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span>{activity.location}</span>
        </div>

        {/* Pro Tip */}
        {activity.tips && (
          <div className="mt-3 p-3 rounded-xl bg-teal-50/70 border border-teal-200/60 flex items-start gap-2 text-xs text-teal-900">
            <Lightbulb className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Insider Tip:</span> {activity.tips}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
