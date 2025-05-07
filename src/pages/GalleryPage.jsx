// src/pages/GalleryPage.jsx
import React from "react";

const tattooGallery = [
  { id: 1, category: "Tradicional", image: "/api/placeholder/300/300", alt: "Tatuaje tradicional" },
  { id: 2, category: "Realista", image: "/api/placeholder/300/300", alt: "Tatuaje realista" },
  { id: 3, category: "Neo-tradicional", image: "/api/placeholder/300/300", alt: "Tatuaje neo-tradicional" },
  { id: 4, category: "Blackwork", image: "/api/placeholder/300/300", alt: "Tatuaje blackwork" },
  { id: 5, category: "Acuarela", image: "/api/placeholder/300/300", alt: "Tatuaje acuarela" },
  { id: 6, category: "Minimalista", image: "/api/placeholder/300/300", alt: "Tatuaje minimalista" },
];

const GalleryPage = () => (
  <section className="py-20 bg-black">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h6 className="text-red-500 font-bold mb-2">GALERÍA</h6>
        <h2 className="text-4xl font-bold mb-4">Mis Mejores Trabajos</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Explora mi colección de diseños y estilos. Cada pieza es única y tiene su propia historia.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tattooGallery.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-lg">
            <img src={item.image} alt={item.alt} className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <div>
                <h3 className="text-xl font-bold">{item.category}</h3>
                <p className="text-gray-300">Tatuaje personalizado</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GalleryPage;
