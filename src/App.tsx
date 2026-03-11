import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/Layout/AppLayout';
import { MapContainer } from './components/Map';
import { ChartPanel } from './components/Charts';
import { Legend } from './components/UI/Legend';
import { ShareButton } from './components/UI/ShareButton';
import { StatsPage } from './components/Stats';
import { useInitialCity } from './hooks';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  // Initialize city selection from URL hash
  useInitialCity();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={
            <>
              <Navigate to="/map" replace />
            </>
          }
        />
        <Route
          path="map"
          element={
            <>
              <MapContainer />
              <ChartPanel />
              <Legend />
              <ShareButton />
            </>
          }
        />
        <Route
          path="map/:cityId"
          element={
            <>
              <MapContainer />
              <ChartPanel />
              <Legend />
              <ShareButton />
            </>
          }
        />
        <Route path="stats" element={<StatsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
