import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import InactivityManager from './components/InactivityManager';
import NavigationBar from './components/NavigationBar';
import TopBar from './components/TopBar';
import RippleEffect from './components/RippleEffect';
import PasswordGateway from './components/PasswordGateway';
import KioskViewport from './components/ui/KioskViewport';
import { KioskSettingsProvider } from './context/KioskSettingsContext';
import { installKioskGuards } from './lib/kioskRuntime';

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
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('nd-kiosk-auth') === 'true'
  );

  useEffect(() => installKioskGuards(), []);

  const handleAuthenticated = () => {
    sessionStorage.setItem('nd-kiosk-auth', 'true');
    setIsAuthenticated(true);
  };

  return (
    <KioskSettingsProvider>
      <KioskViewport>
        {!isAuthenticated ? (
          <PasswordGateway onAuthenticated={handleAuthenticated} />
        ) : (
          <InactivityManager>
            <RippleEffect />
            <TopBar />
            {/* Keyed on pathname so AnimatePresence can cross-fade routes. */}
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
          </InactivityManager>
        )}
      </KioskViewport>
    </KioskSettingsProvider>
  );
}
