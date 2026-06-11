import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ConsultPage from './pages/ConsultPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/consulta" element={<ConsultPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
