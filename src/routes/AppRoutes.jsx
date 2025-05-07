import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GalleryPage from './pages/GalleryPage';
import ConsultPage from './pages/ConsultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/consult" element={<ConsultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
