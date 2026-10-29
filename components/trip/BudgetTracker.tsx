import React, { useState } from 'react';
import { Trip, BudgetBreakdown } from '../../types';
import { useTrips } from '../../context/TripContext';
import { PieChart, AlertCircle, CheckCircle2, Edit2, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface BudgetTrackerProps {
  trip: Trip;
}

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({ trip }) => {
  const { updateTripBudget, updateTrip } = useTrips();
  const [isEditing, setIsEditing] = useState(false);
  const [targetBudgetInput, setTargetBudgetInput] = useState<number>(trip.targetBudget);
  const [budgetBreakdown, setBudgetBreakdown] = useState<BudgetBreakdown>(trip.budget);

  const totalEstimated = Object.values(budgetBreakdown).reduce((acc, curr) => acc + curr, 0);
  const remaining = targetBudgetInput - totalEstimated;
  const percentageSpent = Math.min(Math.round((totalEstimated / (targetBudgetInput || 1)) * 100), 100);

  const handleSaveBudget = () => {
    updateTripBudget(trip.id, budgetBreakdown);
    updateTrip({
      ...trip,
      targetBudget: targetBudgetInput,
      budget: budgetBreakdown
    });
    setIsEditing(false);
  };

  const categories = [
    { key: 'accommodation', label: 'Accommodation 🏨', color: 'bg-indigo-500', amount: budgetBreakdown.accommodation },
    { key: 'food', label: 'Food & Dining 🍽️', color: 'bg-amber-500', amount: budgetBreakdown.food },
    { key: 'transport', label: 'Transportation ✈️', color: 'bg-teal-500', amount: budgetBreakdown.transport },
    { key: 'activities', label: 'Activities & Tours 🎟️', color: 'bg-rose-500', amount: budgetBreakdown.activities },
    { key: 'miscellaneous', label: 'Miscellaneous & Gifts 🛍️', color: 'bg-slate-400', amount: budgetBreakdown.miscellaneous }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      
      {/* Top Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Trip Budget Tracker</h3>
            <p className="text-xs text-slate-500">Live expense projection and category breakdown</p>
          </div>
        </div>

        <div>
          {isEditing ? (
            <Button variant="teal" size="sm" onClick={handleSaveBudget}>
              <Check className="w-4 h-4" />
              <span>Save Budget</span>
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="w-3.5 h-3.5" />
              <span>Adjust Allocations</span>
            </Button>
          )}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Target Budget */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Budget</p>
          {isEditing ? (
            <div className="relative mt-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input
                type="number"
                value={targetBudgetInput}
                onChange={e => setTargetBudgetInput(Number(e.target.value))}
                className="w-full pl-6 pr-2 py-1 text-base font-bold rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          ) : (
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              ${targetBudgetInput.toLocaleString()}
            </p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">{trip.travelers} traveler(s) • {trip.budgetTier} Tier</p>
        </div>

        {/* Total Estimated Cost */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimated Total</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            ${totalEstimated.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">{percentageSpent}% of target budget allocated</p>
        </div>

        {/* Remaining / Variance */}
        <div className={`p-4 rounded-xl border ${
          remaining >= 0 ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-rose-50/60 border-rose-200 text-rose-900'
        }`}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider">Remaining Buffer</p>
            {remaining >= 0 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
          </div>
          <p className="text-2xl font-extrabold mt-1">
            {remaining >= 0 ? `$${remaining.toLocaleString()}` : `-$${Math.abs(remaining).toLocaleString()}`}
          </p>
          <p className="text-[11px] mt-1 font-medium">
            {remaining >= 0 ? '✨ Healthy budget buffer remaining' : '⚠️ Projected expenses exceed target'}
          </p>
        </div>
      </div>

      {/* Visual Multi-color Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-600">
          <span>Expense Distribution</span>
          <span>{totalEstimated} / ${targetBudgetInput}</span>
        </div>
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
          {categories.map(cat => {
            const pct = (cat.amount / (totalEstimated || 1)) * 100;
            return (
              <div
                key={cat.key}
                style={{ width: `${pct}%` }}
                className={`${cat.color} h-full transition-all duration-300`}
                title={`${cat.label}: $${cat.amount}`}
              />
            );
          })}
        </div>
      </div>

      {/* Detailed Category Allocations */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Category Cost Breakdown
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map(cat => {
            const pct = Math.round((cat.amount / (totalEstimated || 1)) * 100);
            return (
              <div
                key={cat.key}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full ${cat.color}`} />
                  <span className="text-sm font-semibold text-slate-700">{cat.label}</span>
                </div>

                {isEditing ? (
                  <div className="relative w-24">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">$</span>
                    <input
                      type="number"
                      min="0"
                      value={budgetBreakdown[cat.key as keyof BudgetBreakdown]}
                      onChange={e => {
                        const val = Number(e.target.value) || 0;
                        setBudgetBreakdown(prev => ({ ...prev, [cat.key]: val }));
                      }}
                      className="w-full pl-5 pr-2 py-1 text-xs font-bold rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                ) : (
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">${cat.amount.toLocaleString()}</span>
                    <span className="text-xs text-slate-400 ml-1.5 font-medium">({pct}%)</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
