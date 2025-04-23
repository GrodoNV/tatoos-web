import { useState, useEffect } from "react";
import { Menu, X, Instagram, Facebook, Twitter } from "lucide-react";
import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black bg-opacity-90 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold italic tracking-wider text-red-500">
              INK<span className="text-white">MASTER</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-lg hover:text-red-500 transition-colors duration-300"
            >
              Inicio
            </Link>
            <Link
              to="/galeria"
              className="text-lg hover:text-red-500 transition-colors duration-300"
            >
              Galería
            </Link>
            <Link
              to="/consulta"
              className="text-lg hover:text-red-500 transition-colors duration-300"
            >
              Consulta
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 bg-black bg-opacity-95 z-40 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
            <Link
              to="/"
              className="hover:text-red-500 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/galeria"
              className="hover:text-red-500 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Galería
            </Link>
            <Link
              to="/consulta"
              className="hover:text-red-500 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Consulta
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <span className="text-2xl font-bold italic tracking-wider text-red-500">
                INK<span className="text-white">MASTER</span>
              </span>
              <p className="mt-2 text-gray-400">Arte en tu piel, para siempre.</p>
            </div>

            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors duration-300"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors duration-300"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors duration-300"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} INKMASTER. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;