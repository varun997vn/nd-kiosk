import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import InactivityManager from './components/InactivityManager';
import NavigationBar from './components/NavigationBar';
import RippleEffect from './components/RippleEffect';

import AttractScreen from './pages/AttractScreen';
import HomeDashboard from './pages/HomeDashboard';
import InstitutionsHub from './pages/InstitutionsHub';
import ActivitiesHub from './pages/ActivitiesHub';
import GlobalPresenceHub from './pages/GlobalPresenceHub';
import ConnectHub from './pages/ConnectHub';
import InstitutionDetail from './pages/InstitutionDetail';
import ActivityDetail from './pages/ActivityDetail';

export default function App() {
  const location = useLocation();

  return (
    <InactivityManager>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <RippleEffect />
        {/* AnimatePresence handles mounting/unmounting animations based on location key */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AttractScreen />} />
            <Route path="/home" element={<HomeDashboard />} />
            <Route path="/institutions" element={<InstitutionsHub />} />
            <Route path="/institutions/:id" element={<InstitutionDetail />} />
            <Route path="/activities" element={<ActivitiesHub />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/global" element={<GlobalPresenceHub />} />
            <Route path="/connect" element={<ConnectHub />} />
          </Routes>
        </AnimatePresence>
        <NavigationBar />
      </div>
    </InactivityManager>
  );
}
