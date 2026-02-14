import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/Layout/AppLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/map" replace />} />
        <Route path="map" element={<div>Map View - Coming Soon</div>} />
        <Route path="map/:cityId" element={<div>City View - Coming Soon</div>} />
      </Route>
    </Routes>
  );
}

export default App;
