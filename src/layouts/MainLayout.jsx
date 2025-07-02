import { useState, useEffect } from "react";
import { Menu, X, Instagram, Facebook, MessageCircle } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
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

  const handleWhatsAppClick = () => {
    const phoneNumber = "59112345678";
    const message = "Hola! Me interesa información sobre sus servicios de tatuajes.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Lato:wght@300;400;700&family=Ruthie&display=swap"
        rel="stylesheet"
      />

      {/* Navbar */}
      <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/60 backdrop-blur-md shadow-2xl border-b border-yellow-500/20 supports-[backdrop-filter]:bg-black/60"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start hover:opacity-80 transition-opacity duration-300">
            <h1
              className="text-4xl lg:text-5xl font-bold text-yellow-400"
              style={{ fontFamily: "Ruthie, cursive" }}
            >
              Villanos
            </h1>
            <span
              className="text-lg text-white ml-2 -mt-2"
              style={{ fontFamily: "Great Vibes, cursive" }}
            >
              Tattoo Studio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {["/", "/galeria", "/consulta"].map((path, index) => {
              const labels = ["Inicio", "Galería", "Consulta"];
              return (
                <Link
                  key={path}
                  to={path}
                  className="text-lg text-gray-300 hover:text-yellow-400 hover:underline underline-offset-4 decoration-yellow-500 transition-all duration-300 font-medium"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {labels[index]}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-yellow-400 hover:text-yellow-300 focus:outline-none transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-20 right-4 w-48 bg-gray-900 border border-yellow-500/30 rounded-lg shadow-2xl z-50 transition-all duration-300 ${
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
                  className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                  style={{ fontFamily: "Lato, sans-serif" }}
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
          <ScrollToTop />
        <Outlet />
      </main>

     <button
  onClick={handleWhatsAppClick}
  className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-40 group"
  aria-label="Contactar por WhatsApp"
>
  {/* Ícono WhatsApp */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 h-7 fill-white"
    viewBox="0 0 32 32"
  >
    <path d="M16 .1C7.2.1.1 7.3.1 16.1c0 2.8.7 5.5 2 7.9L0 32l8.3-2.1c2.3 1.3 5 2 7.7 2 8.8 0 15.9-7.1 15.9-15.9C31.9 7.3 24.8.1 16 .1zM16 29.1c-2.3 0-4.5-.6-6.5-1.7l-.5-.3-4.9 1.3 1.3-4.8-.3-.5c-1.2-2-1.8-4.2-1.8-6.5 0-7.2 5.8-13.1 13.1-13.1s13.1 5.9 13.1 13.1-5.9 13.1-13.1 13.1zm7.6-9.9c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.5-.2-.7.2-.2.4-.8 1.2-1 1.4-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1.2-2-2.6-2.2-3-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.5-.6.2-.2.1-.4.1-.6 0-.2-.6-1.5-.9-2.1-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.8.4s-1 1-1 2.4c0 1.4 1.1 2.8 1.2 3 .2.2 2.1 3.2 5.1 4.5.7.3 1.3.6 1.7.8.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.1.2-.4.2-1 .1-1.1z" />
  </svg>

  {/* Tooltip */}
  <span
    className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black text-yellow-400 px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
    style={{ fontFamily: "Lato, sans-serif" }}
  >
    ¡Escríbenos!
  </span>
</button>


      {/* Footer */}
      <footer className="bg-gray-900 border-t border-yellow-500/30 mt-16 py-10 text-center">
        <div className="container mx-auto px-4 space-y-6">
          <div className="flex flex-col items-center">
            <h3
              className="text-5xl font-bold text-yellow-400"
              style={{ fontFamily: "Ruthie, cursive" }}
            >
              VILLANOS
            </h3>
            <span
              className="text-2xl text-white -mt-2"
              style={{ fontFamily: "Great Vibes, cursive" }}
            >
              Tattoo
            </span>
          </div>

          <p
            className="text-gray-400 max-w-2xl mx-auto text-lg font-light"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Síguenos en redes sociales para ver más trabajos y agendar tu cita.
          </p>

          <div className="flex justify-center space-x-8">
            <a
  href="#"
  className="text-gray-400 hover:text-[#1877F2] transition-colors duration-300 transform hover:scale-110"
  aria-label="Facebook"
>
  <Facebook size={32} />
</a>

            <a
  href="#"
  className="text-gray-400 hover:text-black transition-colors duration-300 transform hover:scale-110"
  aria-label="TikTok"
>
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
</a>

            <a
  href="#"
  className="text-gray-400 hover:text-[#E1306C] transition-colors duration-300 transform hover:scale-110"
  aria-label="Instagram"
>
  <Instagram size={32} />
</a>

          </div>

          <div className="border-t border-yellow-500/20 pt-6">
            <p
              className="text-sm text-gray-500 font-light"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              &copy; {new Date().getFullYear()} Villanos Tattoo. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
