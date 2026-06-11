import React from 'react';
import { authService } from '../../services/authService';

const TattooCard = ({ tattoo, isAdmin, onDelete, onEdit }) => {
  const user = authService.getUser();
  const isActualAdmin = user?.role === 'admin';
  // Función para optimizar la URL de Cloudinary
  const getOptimizedUrl = (url) => {
    if (!url && !url.includes('cloudinary.com')) return url;
    // Insertamos transformaciones: recorte inteligente (c_fill, g_auto), ancho 600px, calidad auto y formato auto
    return url.replace('/upload/', '/upload/c_fill,g_auto,w_600,q_auto,f_auto/');
  };

  return (
    <div className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 group hover:border-purple-500/50 transition-all duration-500 shadow-2xl hover:shadow-purple-500/10">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={getOptimizedUrl(tattoo.image_url)} 
          alt={tattoo.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Capa de degradado estética */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

        {/* Información superpuesta */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-purple-400 text-xs font-black uppercase tracking-widest mb-1">{tattoo.style}</p>
          <h3 className="text-white font-black text-2xl uppercase leading-none mb-2">{tattoo.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {tattoo.description}
          </p>
        </div>
        
        {/* Controles de Admin */}
        {isAdmin && (
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(tattoo); }}
              className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-2xl shadow-xl backdrop-blur-md transition-all active:scale-90"
              title="Editar Tatuaje"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L11.707 14.293a1 1 0 01-.393.262l-3 1a1 1 0 01-1.265-1.265l1-3a1 1 0 01.262-.393L16.5 3.5z" />
              </svg>
            </button>
            {isActualAdmin && (
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(tattoo.id); }}
                className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white p-3 rounded-2xl shadow-xl backdrop-blur-md border border-red-500/30 transition-all active:scale-90"
                title="Eliminar Tatuaje"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TattooCard;
