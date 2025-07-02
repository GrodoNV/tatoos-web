import { useState, useEffect } from "react";
import { ChevronDown, Calendar, Star, Users, Gem } from "lucide-react";// Simulamos Link para mantener la funcionalidad
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

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

  // Servicios ofrecidos

const services = [
  {
    title: "Diseño Personalizado",
    description: "Creaciones únicas que reflejan tu personalidad más oscura y rebelde.",
    icon: <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />,
  },
  {
    title: "Cover-Ups",
    description: "Transforma tatuajes antiguos en nuevas obras maestras villanas.",
    icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />,
  },
  {
    title: "Sesiones Privadas",
    description: "Ambiente exclusivo para crear tu arte más personal y único.",
    icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />,
  },
  {
    title: "Piercings",
    description: "Aplicaciones profesionales y seguras para resaltar tu estilo con actitud.",
    icon: <Gem className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />, // reemplazo elegante
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
      { threshold: 0.1 }
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
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&family=Great+Vibes&family=Lato:wght@300;400;700&family=Ruthie&display=swap" rel="stylesheet" />
      
      {/* Hero Section */}
     <section
  id="home"
  className="relative min-h-[90vh] flex items-center justify-center bg-black px-4 sm:px-6 pt-0"
>
  <div
    className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
    style={{
      backgroundImage: "url('https://res.cloudinary.com/dqo6iby5j/image/upload/v1751403522/fondo_s2pciv.jpg')",
    }}
  ></div>

  {/* Overlay gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-5"></div>

  <div className={`container mx-auto text-center relative z-10 transform transition-all duration-1000 ${
    isVisible.hero ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
  }`}>

    {/* Botones con más separación hacia abajo */}
    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0 mt-52 sm:mt-72">
      <Link to="/consulta" className="w-full sm:w-auto text-center">
        <button
          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-2
                     bg-yellow-400/20 backdrop-blur-md text-yellow-300
                     font-medium rounded-full shadow-lg
                     transition-all duration-300 text-base sm:text-sm
                     transform active:scale-95 hover:scale-105
                     hover:bg-yellow-400/30 border border-yellow-500"
          style={{ fontFamily: 'Lato, sans-serif' }}
        >
          Reservar Cita
        </button>
      </Link>

      <Link
        to="/galeria"
        className="w-full sm:w-auto text-center
                   px-5 sm:px-6 py-2.5 sm:py-2
                   rounded-full font-medium
                   text-yellow-400 border border-yellow-500
                   bg-transparent
                   hover:bg-yellow-500 hover:text-black
                   transition-all duration-300 text-base sm:text-sm
                   transform active:scale-95 shadow-md"
        style={{ fontFamily: 'Lato, sans-serif' }}
      >
        Ver Trabajos
      </Link>
    </div>
  </div>

  {/* Chevron visible sin scroll */}
  <a
    href="#about"
    className="absolute bottom-10 sm:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce"
  >
    <ChevronDown size={28} className="text-yellow-400 opacity-70 sm:w-8 sm:h-8" />
  </a>
</section>



      {/* About Section */}
      <section
        id="about"
        className="py-12 sm:py-16 lg:py-20 bg-gray-900"
      >
        <div className={`container mx-auto px-4 sm:px-6 transition-all duration-1000 ${
          isVisible.about ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}>
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="w-full h-64 sm:h-80 lg:h-96 bg-gray-800 rounded-lg overflow-hidden border-2 border-yellow-500/20">
                  <picture>
                    <source
                      srcSet="https://res.cloudinary.com/dqo6iby5j/image/upload/v1746799777/pexels-photo-4123838_kmxhpm.webp"
                      type="image/webp"
                    />
                    <img
                      src="https://res.cloudinary.com/dqo6iby5j/image/upload/v1746799777/pexels-photo-4123838_kmxhpm.webp"
                      alt="Tatuador trabajando"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </div>
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-yellow-500 text-black p-3 sm:p-4 rounded-lg shadow-2xl">
                  <p className="text-lg sm:text-xl font-bold" style={{ fontFamily: 'Lato, sans-serif' }}>+10 años</p>
                  <p className="text-sm sm:text-base opacity-90 hidden sm:block" style={{ fontFamily: 'Lato, sans-serif' }}>de experiencia</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h6 
                className="text-yellow-400 font-bold mb-2 text-lg sm:text-base tracking-wider"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                SOBRE NOSOTROS
              </h6>
              <h2 
                className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-yellow-400 leading-tight"
                style={{ fontFamily: 'UnifrakturCook, cursive' }}
              >
                Maestros del Arte Oscuro
              </h2>
              <p 
                className="text-xl sm:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed font-light"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                En Villanos Tattoo, creamos más que tatuajes: forjamos identidades rebeldes. 
                Con más de una década de experiencia, nos especializamos en diseños únicos 
                que abrazan tu lado más oscuro y auténtico.
              </p>
              <p 
                className="text-xl sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed font-light"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                Cada pieza es una obra maestra personalizada que cuenta tu historia de rebeldía. 
                Nuestro estudio mantiene los más altos estándares de higiene y calidad, 
                utilizando solo equipos premium y tintas de primera clase.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-yellow-500/20 border-2 border-yellow-500 rounded-full flex items-center justify-center">
    <span className="text-3xl sm:text-5xl">🎭</span>
  </div>
  <div className="text-center sm:text-left">
    <h4 
      className="text-4xl sm:text-5xl font-semibold text-yellow-400"
      style={{ fontFamily: 'Great Vibes, cursive' }}
    >
      Artistas Villanos
    </h4>
    <p 
      className="text-xl sm:text-xl text-gray-400 font-light"
      style={{ fontFamily: 'Lato, sans-serif' }}
    >
      Especialistas en arte rebelde
    </p>
  </div>
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
     <section
  id="services"
  className="py-12 sm:py-16 lg:py-20 bg-black"
>
  <div className={`container mx-auto px-4 sm:px-6 text-center transition-all duration-1000 ${
    isVisible.services ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
  }`}>
    <h2 
      className="text-4xl sm:text-5xl font-bold mb-3 text-yellow-400"
      style={{ fontFamily: 'UnifrakturCook, cursive' }}
    >
      Servicios
    </h2>
    <p 
      className="text-3xl text-gray-400 mb-8 sm:mb-12"
      style={{ fontFamily: 'Great Vibes, cursive' }}
    >
      Forjamos tu rebeldía
    </p>

    {/* Grid para los primeros 3 servicios */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
      {services.slice(0, 3).map((service) => (
        <div 
          key={service.title} 
          className="bg-gray-900 border border-yellow-500/20 p-6 sm:p-8 rounded-xl shadow-2xl hover:bg-gray-800 hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:scale-105 group"
        >
          <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
            {service.icon}
          </div>
          <h3 
            className="text-3xl sm:text-2xl font-semibold text-yellow-400 mb-3 sm:mb-4"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            {service.title}
          </h3>
          <p 
            className="text-xl sm:text-xl text-gray-300 leading-relaxed font-light"
            style={{ fontFamily: 'Lato, sans-serif' }}
          >
            {service.description}
          </p>
        </div>
      ))}
    </div>

    {/* Tarjeta 4: centrada abajo en desktop */}
    <div className="mt-6 lg:mt-12 lg:col-span-3 flex justify-center">
      <div 
        className="bg-gray-900 border border-yellow-500/20 p-6 sm:p-8 rounded-xl shadow-2xl hover:bg-gray-800 hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:scale-105 group w-full sm:max-w-md"
      >
        <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
          {services[3].icon}
        </div>
        <h3 
          className="text-3xl sm:text-2xl font-semibold text-yellow-400 mb-3 sm:mb-4"
          style={{ fontFamily: 'Great Vibes, cursive' }}
        >
          {services[3].title}
        </h3>
        <p 
          className="text-xl sm:text-xl text-gray-300 leading-relaxed font-light"
          style={{ fontFamily: 'Lato, sans-serif' }}
        >
          {services[3].description}
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Contact Section */}
     <section
  id="contact"
  className="py-16 sm:py-20 lg:py-24 relative bg-black overflow-hidden"
>
  {/* Fondo decorativo suave */}
  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10"></div>
  <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-black/50 to-black"></div>

  <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
    <h2 
      className="text-5xl sm:text-6xl font-bold mb-4 text-yellow-400"
      style={{ fontFamily: 'UnifrakturCook, cursive' }}
    >
      Tu historia empieza aquí
    </h2>
    <p 
      className="text-2xl sm:text-3xl text-gray-300 italic mb-6"
      style={{ fontFamily: 'Great Vibes, cursive' }}
    >
      El arte villano no se explica... se lleva en la piel
    </p>
    <p 
      className="text-lg sm:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
      style={{ fontFamily: 'Lato, sans-serif' }}
    >
      En Villanos Tattoo, transformamos tus ideas en arte eterno. Nuestro estudio en Villa Fátima es el espacio donde tu rebeldía toma forma. Agenda tu cita y deja que tu piel hable por ti.
    </p>

    <Link to="/consulta" className="inline-block">
      <button
        className="px-8 py-3 bg-yellow-400/20 text-yellow-300 font-medium text-lg rounded-full shadow-lg border border-yellow-500 backdrop-blur-md hover:bg-yellow-500/30 hover:scale-105 transition-all duration-300"
        style={{ fontFamily: 'Lato, sans-serif' }}
      >
        Reservar tu Cita
      </button>
    </Link>
  </div>
</section>

    </>
  );
};

export default LandingPage;