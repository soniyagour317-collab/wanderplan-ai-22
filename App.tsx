import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { TripProvider, useTrips } from './context/TripContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/layout/Toast';
import { CreateTripModal } from './components/trip/CreateTripModal';
import { AuthModal } from './components/auth/AuthModal';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TripDetailPage } from './pages/TripDetailPage';
import { ExplorePage } from './pages/ExplorePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { PackingList } from './components/trip/PackingList';
import { Destination } from './types';

const MainApp: React.FC = () => {
  const { trips, setActiveTripId } = useTrips();
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [prefilledCity, setPrefilledCity] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Check URL query parameters for shared trip id
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tripParam = params.get('trip');
    if (tripParam) {
      const match = trips.find(t => t.id === tripParam);
      if (match) {
        setSelectedTripId(match.id);
        setActiveTripId(match.id);
        setCurrentTab('trip-detail');
      }
    }
  }, [trips, setActiveTripId]);

  const handleOpenCreateTrip = (city?: string) => {
    setPrefilledCity(city || '');
    setCreateModalOpen(true);
  };

  const handlePlanTripFromDest = (destination: Destination) => {
    handleOpenCreateTrip(`${destination.name}, ${destination.country}`);
  };

  const handleSelectTrip = (tripId: string) => {
    setSelectedTripId(tripId);
    setActiveTripId(tripId);
    setCurrentTab('trip-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTripCreated = (newTripId: string) => {
    handleSelectTrip(newTripId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={tab => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCreateTrip={() => handleOpenCreateTrip()}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Page Routing Switch */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            onOpenCreateTrip={city => handleOpenCreateTrip(city)}
            onSelectTab={setCurrentTab}
            onPlanTripFromDest={handlePlanTripFromDest}
          />
        )}

        {currentTab === 'explore' && (
          <ExplorePage onPlanTrip={handlePlanTripFromDest} />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            onOpenCreateTrip={() => handleOpenCreateTrip()}
            onSelectTrip={handleSelectTrip}
          />
        )}

        {currentTab === 'favorites' && (
          <FavoritesPage
            onPlanTrip={handlePlanTripFromDest}
            onExplore={() => setCurrentTab('explore')}
          />
        )}

        {currentTab === 'packing' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <PackingList />
          </div>
        )}

        {currentTab === 'trip-detail' && selectedTripId && (
          <TripDetailPage
            tripId={selectedTripId}
            onBack={() => setCurrentTab('dashboard')}
          />
        )}
      </main>

      {/* Global Modals */}
      <CreateTripModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        prefilledDestination={prefilledCity}
        onSuccessTripCreated={handleTripCreated}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <TripProvider>
          <MainApp />
        </TripProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
