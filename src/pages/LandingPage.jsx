import { useState, useEffect } from "react";
import { ChevronDown, Calendar, Clock, Star, Users, Phone } from "lucide-react";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Estado para animaciones de entrada
  const [isVisible, setIsVisible] = useState({
    hero: false,
    about: false,
    portfolio: false,
    services: false,
    testimonials: false,
    contact: false,
  });

  // Galería de imágenes de tatuajes
  const tattooGallery = [
    { id: 1, category: "Tradicional", image: "/api/placeholder/300/300", alt: "Tatuaje tradicional" },
    { id: 2, category: "Realista", image: "/api/placeholder/300/300", alt: "Tatuaje realista" },
    { id: 3, category: "Neo-tradicional", image: "/api/placeholder/300/300", alt: "Tatuaje neo-tradicional" },
    { id: 4, category: "Blackwork", image: "/api/placeholder/300/300", alt: "Tatuaje blackwork" },
    { id: 5, category: "Acuarela", image: "/api/placeholder/300/300", alt: "Tatuaje acuarela" },
    { id: 6, category: "Minimalista", image: "/api/placeholder/300/300", alt: "Tatuaje minimalista" },
  ];

  // Servicios ofrecidos
  const services = [
    {
      title: "Diseño Personalizado",
      description: "Creaciones únicas adaptadas a tu estilo y preferencias.",
      icon: <Star className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Cover-Ups",
      description: "Transforma tatuajes antiguos en nuevas obras de arte.",
      icon: <Calendar className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Sesiones Privadas",
      description: "Ambiente exclusivo para una experiencia única.",
      icon: <Users className="w-8 h-8 text-red-500" />,
    },
  ];

  // Efecto para animar elementos cuando se hacen visibles
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Activar la sección hero inmediatamente
    setIsVisible((prev) => ({ ...prev, hero: true }));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center bg-black"
      >
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ 
          backgroundImage: "url('/api/placeholder/1920/1080')",
          opacity: 0.5
        }}></div>
        
        <div className={`container mx-auto px-4 text-center relative z-10 transform transition-all duration-1000 ${
          isVisible.hero ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-red-500">Arte</span> en tu piel
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Convierte tus ideas en arte permanente con nuestros diseños exclusivos y técnicas innovadoras.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
  <Link
    to="/consulta"
    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
  >
    Reservar Cita
  </Link>
  <Link
    to="/galeria"
    className="bg-transparent border-2 border-white hover:border-red-500 hover:text-red-500 font-bold py-3 px-8 rounded-full transition-colors duration-300"
  >
    Ver Trabajos
  </Link>
</div>

        </div>
        
        <a
          href="#about"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown size={32} className="text-white opacity-70" />
        </a>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gray-900"
      >
        <div className={`container mx-auto px-4 transition-all duration-1000 ${
          isVisible.about ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-full h-96 bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src="/api/placeholder/600/800"
                    alt="Tatuador trabajando"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-red-500 p-4 rounded-lg">
                  <p className="text-lg font-bold">+10 años de experiencia</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h6 className="text-red-500 font-bold mb-2">SOBRE MÍ</h6>
              <h2 className="text-4xl font-bold mb-6">Artista con pasión por la tinta</h2>
              <p className="text-gray-300 mb-6">
                Con más de una década de experiencia, me especializo en crear diseños únicos 
                que cuentan historias a través de la piel. Mi enfoque combina técnicas 
                tradicionales con estilos contemporáneos para lograr tatuajes que 
                verdaderamente representen tu visión.
              </p>
              <p className="text-gray-300 mb-8">
                Cada tatuaje es una obra de arte personalizada, creada específicamente para ti. 
                Mi estudio garantiza los más altos estándares de higiene y seguridad, utilizando 
                solo equipos de primera calidad y tintas premium.
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="/api/placeholder/80/80"
                  alt="Firma del artista"
                  className="w-20 h-auto"
                />
                <div>
                  <p className="font-bold">Carlos Rivera</p>
                  <p className="text-gray-400">Maestro Tatuador</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Services Section */}
      <section
        id="services"
        className="py-20 bg-gray-900"
      >
        <div className={`container mx-auto px-4 transition-all duration-1000 ${
          isVisible.services ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}>
          <div className="text-center mb-12">
            <h6 className="text-red-500 font-bold mb-2">SERVICIOS</h6>
            <h2 className="text-4xl font-bold mb-4">Lo Que Ofrezco</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Servicios premium para crear el tatuaje perfecto que llevarás con orgullo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-gray-800 p-8 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                <div className="bg-gray-900 p-4 inline-block rounded-lg mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-gray-800 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">¿Listo para tu próximo tatuaje?</h3>
                <p className="text-gray-300">
                  Agenda una consulta gratuita para discutir tu idea.
                </p>
              </div>
              <a
                href="#contact"
                className="mt-6 md:mt-0 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
              >
                Reservar Consulta
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;