import { useState, useEffect } from "react";
import { Menu, X, Instagram, Facebook, Twitter } from "lucide-react";
import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold italic tracking-wider bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent"
          >
            INK<span className="text-white">MASTER</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {["/", "/galeria", "/consulta"].map((path, index) => {
              const labels = ["Inicio", "Galería", "Consulta"];
              return (
                <Link
                  key={path}
                  to={path}
                  className="text-lg text-gray-300 hover:text-white hover:underline underline-offset-4 decoration-red-500 transition duration-300"
                >
                  {labels[index]}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {/* Mobile Menu */}
<div
  className={`md:hidden fixed top-20 right-4 w-48 bg-gray-800 rounded-lg shadow-lg z-50 transition-all duration-300 ${
    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
  }`}
>
  <div className="flex flex-col text-center py-4 space-y-4">
    {["/", "/galeria", "/consulta"].map((path, index) => {
      const labels = ["Inicio", "Galería", "Consulta"];
      return (
        <Link
          key={path}
          to={path}
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-red-400 transition-colors duration-200"
        >
          {labels[index]}
        </Link>
      );
    })}
  </div>
</div>

      </header>

      {/* Main Content */}
      <main className="pt-20 px-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black mt-16 py-10 text-center border-t border-gray-800">
        <div className="container mx-auto px-4 space-y-6">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            ¡Gracias por visitar InkMaster!
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Sígueme en redes sociales para ver más trabajos y agendar tu cita.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition duration-300"
            >
              <Instagram />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition duration-300"
            >
              <Facebook />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition duration-300"
            >
              <Twitter />
            </a>
          </div>
          <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} InkMaster. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
