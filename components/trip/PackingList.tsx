import React, { useState } from 'react';
import { useTrips } from '../../context/TripContext';
import { PackingItem } from '../../types';
import { CheckSquare, Plus, Trash2, RotateCcw, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface PackingListProps {
  tripTitle?: string;
}

export const PackingList: React.FC<PackingListProps> = ({ tripTitle }) => {
  const { packingList, togglePackingItem, addPackingItem, removePackingItem, resetPackingList } = useTrips();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unpacked' | 'packed'>('all');
  const [newItemLabel, setNewItemLabel] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<PackingItem['category']>('Essentials');

  const categories = ['All', 'Documents', 'Essentials', 'Clothing', 'Electronics', 'Toiletries', 'Other'];

  const filteredItems = packingList.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'packed'
        ? item.packed
        : !item.packed;
    return matchesCategory && matchesStatus;
  });

  const packedCount = packingList.filter(i => i.packed).length;
  const totalCount = packingList.length;
  const progressPct = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemLabel.trim()) return;
    addPackingItem(newItemCategory, newItemLabel.trim());
    setNewItemLabel('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      
      {/* Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Interactive Packing Checklist
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {tripTitle ? `Curated checklist for ${tripTitle}` : 'Smart essentials to keep your travel stress-free'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={resetPackingList}>
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Checked</span>
          </Button>
        </div>
      </div>

      {/* Progress Metric */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-slate-700">
          <span>Packing Readiness</span>
          <span className="text-teal-700">{packedCount} of {totalCount} packed ({progressPct}%)</span>
        </div>
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            style={{ width: `${progressPct}%` }}
            className="h-full bg-teal-600 rounded-full transition-all duration-300"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white border-teal-600 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status toggles */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-400">View:</span>
          {(['all', 'unpacked', 'packed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`capitalize px-2 py-0.5 rounded ${
                statusFilter === f
                  ? 'bg-slate-900 text-white font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newItemLabel}
          onChange={e => setNewItemLabel(e.target.value)}
          placeholder="Add custom item (e.g. Hiking poles, Swimwear)..."
          className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <select
          value={newItemCategory}
          onChange={e => setNewItemCategory(e.target.value as PackingItem['category'])}
          className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
        >
          <option value="Essentials">Essentials</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Toiletries">Toiletries</option>
          <option value="Documents">Documents</option>
          <option value="Other">Other</option>
        </select>
        <Button type="submit" variant="teal" size="sm">
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </Button>
      </form>

      {/* Items List */}
      <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => togglePackingItem(item.id)}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none transition-all ${
                item.packed
                  ? 'bg-emerald-50/40 border-emerald-200 text-slate-400'
                  : 'bg-white border-slate-200/80 text-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    item.packed
                      ? 'bg-teal-600 border-teal-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {item.packed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div>
                  <span
                    className={`text-sm font-medium ${
                      item.packed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              {item.custom && (
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    removePackingItem(item.id);
                  }}
                  className="p-1 rounded text-slate-300 hover:text-rose-500 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-400 text-sm">
            No items in this category or filter.
          </div>
        )}
      </div>
    </div>
  );
};
