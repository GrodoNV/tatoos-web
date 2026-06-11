import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from '../pages/LandingPage';
import GalleryPage from '../pages/GalleryPage';
import ConsultPage from '../pages/ConsultPage';
import AdminPage from '../pages/AdminPage';
import DashboardPage from '../pages/DashboardPage';
import { authService } from '../services/authService';

function VisitTracker() {
  const location = useLocation();

  useEffect(() => {
    authService.logVisit(location.pathname);
  }, [location]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <VisitTracker />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/consult" element={<ConsultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
