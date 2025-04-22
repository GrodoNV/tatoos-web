import { Outlet, Link } from 'react-router-dom';

function MainLayout() {
  return (
    <div>
      <header className="bg-black text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">Tattoo Studio</h1>
        <nav className="space-x-4">
          <Link to="/">Inicio</Link>
          <Link to="/galeria">Galería</Link>
          <Link to="/consulta">Consulta</Link>
        </nav>
      </header>

      <main className="p-4">
        <Outlet />
      </main>

      <footer className="bg-black text-white text-center p-4 mt-10">
        © {new Date().getFullYear()} Tattoo Studio
      </footer>
    </div>
  );
}

export default MainLayout;
