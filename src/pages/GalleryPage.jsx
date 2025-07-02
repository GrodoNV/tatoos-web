import React, { useState, useEffect } from "react";

// Simulamos Link para mantener la funcionalidad
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

// GALERÍA DE TATUAJES
const tattooGallery = [
  {
    id: 1,
    category: "Tradicional",
    image: "https://res.cloudinary.com/demo/image/upload/w_400,h_500,c_fill/tradicional1.jpg",
    alt: "Tatuaje tradicional americano con ancla y rosas",
    description: "Líneas gruesas y colores vivos que perduran en el tiempo"
  },
  {
    id: 2,
    category: "Realista",
    image: "https://res.cloudinary.com/demo/image/upload/w_400,h_500,c_fill/realista1.jpg",
    alt: "Tatuaje realista de retrato con sombras detalladas",
    description: "Técnica fotográfica con increíble nivel de detalle"
  },
  {
    id: 3,
    category: "Neo-tradicional",
    image: "https://res.cloudinary.com/demo/image/upload/w_400,h_500,c_fill/neotradicional1.jpg",
    alt: "Tatuaje neo-tradicional de animal con colores vibrantes",
    description: "Fusión perfecta entre técnicas modernas y estética clásica"
  },
  {
    id: 4,
    category: "Blackwork",
    image: "https://res.cloudinary.com/demo/image/upload/w_400,h_500,c_fill/blackwork1.jpg",
    alt: "Tatuaje blackwork con patrones geométricos",
    description: "Negros profundos y diseños impactantes que destacan en la piel"
  },
  {
    id: 5,
    category: "Acuarela",
    image: "https://res.cloudinary.com/demo/image/upload/w_400,h_500,c_fill/acuarela1.jpg",
    alt: "Tatuaje estilo acuarela con salpicaduras de color",
    description: "Efecto artístico de pintura con transiciones suaves de color"
  },
  {
    id: 6,
    category: "Minimalista",
    image: "https://res.cloudinary.com/demo/image/upload/w_400,h_500,c_fill/minimalista1.jpg",
    alt: "Tatuaje minimalista de líneas finas",
    description: "Diseños elegantes y simples que transmiten grandes ideas"
  },
  {
    id: 7,
    category: "Mandala",
    image: "https://res.cloudinary.com/demo/image/upload/w_400,h_500,c_fill/mandala1.jpg",
    alt: "Tatuaje de mandala con detalles intrincados",
    description: "Patrones sagrados con significado espiritual profundo"
  },
  {
    id: 8,
    category: "Lettering",
    image: "https://res.cloudinary.com/demo/image/upload/w_400,h_500,c_fill/lettering1.jpg",
    alt: "Tatuaje de lettering con caligrafía artística",
    description: "Palabras que cobran vida con tipografía única"
  },
  {
    id: 9,
    category: "Japonés",
    image: "https://res.cloudinary.com/demo/image/upload/w_400,h_500,c_fill/japones1.jpg",
    alt: "Tatuaje estilo japonés tradicional",
    description: "Arte oriental con técnicas ancestrales"
  }
];

const GalleryPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h6
            className="text-yellow-400 text-6xl tracking-wide mb-1"
            style={{ fontFamily: "Ruthie, cursive" }}
          >
            Galería de Arte
          </h6>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            Mi Colección de Tatuajes
          </h2>
          <p
            className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Cada diseño refleja mi pasión por el arte corporal. Piezas únicas creadas
            con técnica, creatividad y respeto por la tradición del tatuaje.
          </p>
        </div>

        {/* Galería */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {tattooGallery.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl shadow-xl bg-gray-800"
            >
              {/* Imagen */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                
              </div>

              {/* Texto */}
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-white" style={{ fontFamily: "Great Vibes, cursive" }}>
                  {item.category}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p
            className="text-gray-300 text-base sm:text-lg mb-6 max-w-2xl mx-auto"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            ¿Te gusta lo que ves? Agenda una consulta para diseñar tu próximo tatuaje.
          </p>
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

        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
