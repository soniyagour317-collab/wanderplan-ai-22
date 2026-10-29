import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Trip, CreateTripInput, Activity, PackingItem, BudgetBreakdown } from '../types';
import { storageService } from '../services/storageService';
import { generateItinerary } from '../services/aiService';
import { useToast } from './ToastContext';

interface TripContextType {
  trips: Trip[];
  activeTrip: Trip | null;
  favorites: string[];
  packingList: PackingItem[];
  isGenerating: boolean;
  setActiveTripId: (id: string | null) => void;
  createTrip: (input: CreateTripInput) => Promise<Trip | null>;
  updateTrip: (trip: Trip) => void;
  deleteTrip: (tripId: string) => void;
  duplicateTrip: (tripId: string) => void;
  // Activity operations
  addActivity: (dayNumber: number, activity: Omit<Activity, 'id'>) => void;
  updateActivity: (dayNumber: number, activity: Activity) => void;
  deleteActivity: (dayNumber: number, activityId: string) => void;
  reorderActivities: (dayNumber: number, fromIndex: number, toIndex: number) => void;
  // Trip details
  updateTripNotes: (tripId: string, notes: string) => void;
  updateTripBudget: (tripId: string, budget: BudgetBreakdown) => void;
  // Favorites
  toggleFavorite: (destinationId: string) => void;
  isFavorite: (destinationId: string) => boolean;
  // Packing list
  togglePackingItem: (id: string) => void;
  addPackingItem: (category: PackingItem['category'], label: string) => void;
  removePackingItem: (id: string) => void;
  resetPackingList: () => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>(() => storageService.getTrips());
  const [activeTripId, setActiveTripIdState] = useState<string | null>(() => storageService.getActiveTripId());
  const [favorites, setFavorites] = useState<string[]>(() => storageService.getFavorites());
  const [packingList, setPackingList] = useState<PackingItem[]>(() => storageService.getPackingList());
  const [isGenerating, setIsGenerating] = useState(false);
  const { showToast } = useToast();

  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0] || null;

  const setActiveTripId = (id: string | null) => {
    setActiveTripIdState(id);
    storageService.setActiveTripId(id);
  };

  const createTrip = async (input: CreateTripInput): Promise<Trip | null> => {
    setIsGenerating(true);
    try {
      showToast('WanderPlan AI is formulating your day-by-day plan...', 'info');
      const result = await generateItinerary(input);
      const newTrip = result.trip;

      const updated = [newTrip, ...trips];
      setTrips(updated);
      storageService.saveTrips(updated);
      setActiveTripId(newTrip.id);

      showToast(result.message, 'success');
      return newTrip;
    } catch (err: any) {
      showToast('Failed to create itinerary. Please try again.', 'error');
      console.error(err);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const updateTrip = (updatedTrip: Trip) => {
    const updated = trips.map(t => (t.id === updatedTrip.id ? updatedTrip : t));
    setTrips(updated);
    storageService.saveTrips(updated);
    showToast('Trip changes saved!', 'success');
  };

  const deleteTrip = (tripId: string) => {
    const updated = trips.filter(t => t.id !== tripId);
    setTrips(updated);
    storageService.saveTrips(updated);
    if (activeTripId === tripId) {
      const nextId = updated.length > 0 ? updated[0].id : null;
      setActiveTripId(nextId);
    }
    showToast('Trip successfully removed', 'info');
  };

  const duplicateTrip = (tripId: string) => {
    const original = trips.find(t => t.id === tripId);
    if (!original) return;

    const copy: Trip = {
      ...original,
      id: `trip-copy-${Date.now()}`,
      title: `${original.title} (Copy)`,
      createdAt: new Date().toISOString()
    };

    const updated = [copy, ...trips];
    setTrips(updated);
    storageService.saveTrips(updated);
    setActiveTripId(copy.id);
    showToast('Trip duplicated successfully', 'success');
  };

  // Activity management
  const addActivity = (dayNumber: number, activityData: Omit<Activity, 'id'>) => {
    if (!activeTrip) return;

    const newActivity: Activity = {
      ...activityData,
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
    };

    const updatedDays = activeTrip.days.map(day => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: [...day.activities, newActivity]
        };
      }
      return day;
    });

    const updatedTrip: Trip = { ...activeTrip, days: updatedDays };
    updateTrip(updatedTrip);
  };

  const updateActivity = (dayNumber: number, activity: Activity) => {
    if (!activeTrip) return;

    const updatedDays = activeTrip.days.map(day => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: day.activities.map(act => (act.id === activity.id ? activity : act))
        };
      }
      return day;
    });

    const updatedTrip: Trip = { ...activeTrip, days: updatedDays };
    updateTrip(updatedTrip);
  };

  const deleteActivity = (dayNumber: number, activityId: string) => {
    if (!activeTrip) return;

    const updatedDays = activeTrip.days.map(day => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: day.activities.filter(act => act.id !== activityId)
        };
      }
      return day;
    });

    const updatedTrip: Trip = { ...activeTrip, days: updatedDays };
    updateTrip(updatedTrip);
  };

  const reorderActivities = (dayNumber: number, fromIndex: number, toIndex: number) => {
    if (!activeTrip) return;

    const updatedDays = activeTrip.days.map(day => {
      if (day.dayNumber === dayNumber) {
        const list = [...day.activities];
        const [moved] = list.splice(fromIndex, 1);
        list.splice(toIndex, 0, moved);
        return { ...day, activities: list };
      }
      return day;
    });

    const updatedTrip: Trip = { ...activeTrip, days: updatedDays };
    updateTrip(updatedTrip);
  };

  const updateTripNotes = (tripId: string, notes: string) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;
    const updated = { ...trip, notes };
    updateTrip(updated);
  };

  const updateTripBudget = (tripId: string, budget: BudgetBreakdown) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;
    const updated = { ...trip, budget };
    updateTrip(updated);
  };

  // Favorites
  const toggleFavorite = (destinationId: string) => {
    const updated = storageService.toggleFavorite(destinationId);
    setFavorites(updated);
    const added = updated.includes(destinationId);
    showToast(added ? 'Saved to your favorites!' : 'Removed from favorites', 'info');
  };

  const isFavorite = (destinationId: string) => favorites.includes(destinationId);

  // Packing list
  const togglePackingItem = (id: string) => {
    const updated = packingList.map(item =>
      item.id === id ? { ...item, packed: !item.packed } : item
    );
    setPackingList(updated);
    storageService.savePackingList(updated);
  };

  const addPackingItem = (category: PackingItem['category'], label: string) => {
    if (!label.trim()) return;
    const newItem: PackingItem = {
      id: `pack-${Date.now()}`,
      category,
      label: label.trim(),
      packed: false,
      custom: true
    };
    const updated = [newItem, ...packingList];
    setPackingList(updated);
    storageService.savePackingList(updated);
    showToast(`Added "${label}" to packing checklist`, 'success');
  };

  const removePackingItem = (id: string) => {
    const updated = packingList.filter(item => item.id !== id);
    setPackingList(updated);
    storageService.savePackingList(updated);
    showToast('Item removed', 'info');
  };

  const resetPackingList = () => {
    const defaultList = storageService.getPackingList();
    const reset = defaultList.map(item => ({ ...item, packed: false }));
    setPackingList(reset);
    storageService.savePackingList(reset);
    showToast('Checklist reset', 'info');
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        activeTrip,
        favorites,
        packingList,
        isGenerating,
        setActiveTripId,
        createTrip,
        updateTrip,
        deleteTrip,
        duplicateTrip,
        addActivity,
        updateActivity,
        deleteActivity,
        reorderActivities,
        updateTripNotes,
        updateTripBudget,
        toggleFavorite,
        isFavorite,
        togglePackingItem,
        addPackingItem,
        removePackingItem,
        resetPackingList
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = (): TripContextType => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
};
