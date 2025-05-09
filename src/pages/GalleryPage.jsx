import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Reemplaza estos links con los tuyos reales desde Cloudinary
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
];

const categories = ["Todos", ...new Set(tattooGallery.map(item => item.category))];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [filteredGallery, setFilteredGallery] = useState(tattooGallery);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    if (selectedCategory === "Todos") {
      setFilteredGallery(tattooGallery);
    } else {
      setFilteredGallery(tattooGallery.filter(item => item.category === selectedCategory));
    }

    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 100);
  }, [selectedCategory]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-red-500 font-bold uppercase tracking-wider mb-2">Galería de Arte</h6>
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
            Mi Colección de Tatuajes
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Cada diseño refleja mi pasión por el arte corporal. Piezas únicas creadas 
            con técnica, creatividad y respeto por la tradición del tatuaje.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-red-600 text-white shadow-lg shadow-red-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {filteredGallery.map((item) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <picture>
                <source srcSet={item.image} media="(min-width: 1024px)" />
                <source srcSet={item.image} media="(min-width: 640px)" />
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </picture>

              <div 
                className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-6 transition-all duration-500 ${hoveredItem === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              >
                <span className="inline-block px-3 py-1 bg-red-600 text-xs font-bold rounded-full mb-2 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.category}
                </span>
                <h3 className="text-2xl font-bold mb-1 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.category}
                </h3>
                <p className="text-gray-300 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-300 mb-6">
            ¿Te gusta lo que ves? Agenda una consulta para diseñar tu próximo tatuaje
          </p>
          <Link to="/consulta">
            <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white font-bold rounded-lg shadow-xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105">
              Reservar Cita
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
