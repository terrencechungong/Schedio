import { Routes, Route } from 'react-router-dom';
import Compose from '../pages/Compose';
import Schedule from '../pages/Schedule';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/compose" element={<Compose />} />
      <Route path="/schedule" element={<Schedule />} />
      {/* Add other routes */}
    </Routes>
  );
} 