import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ConsultPage from './pages/ConsultPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/consulta" element={<ConsultPage />} />
      </Route>
    </Routes>
  );
}

export default App;
