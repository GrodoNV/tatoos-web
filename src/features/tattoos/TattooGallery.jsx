import React, { useState, useEffect } from 'react';
import TattooCard from './TattooCard';
import { tattoosService } from './tattoosService';
import { authService } from '../../services/authService';

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3000/api';

const TattooGallery = () => {
  const [tattoos, setTattoos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTattoo, setEditingTattoo] = useState(null);
  
  const [formData, setFormData] = useState({ title: '', style: '', description: '' });
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setIsAdmin(authService.isAuthenticated());
    loadTattoos();
  }, []);

  const loadTattoos = async () => {
    try {
      const data = await tattoosService.getAll();
      setTattoos(data || []);
    } catch (error) {
      console.error('Error cargando tatuajes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (tattoo = null) => {
    if (tattoo) {
      setEditingTattoo(tattoo);
      setFormData({ title: tattoo.title, style: tattoo.style, description: tattoo.description });
    } else {
      setEditingTattoo(null);
      setFormData({ title: '', style: '', description: '' });
    }
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas eliminar este tatuaje definitivamente?')) {
      try {
        await tattoosService.delete(id, authService.getToken());
        setTattoos(prev => prev.filter(t => t.id !== id));
      } catch (error) {
        alert('Error al eliminar: ' + error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      let imageUrl = editingTattoo ? editingTattoo.image_url : '';

      if (selectedImage) {
        const fileData = new FormData();
        fileData.append('image', selectedImage);
        
        console.log('Subiendo imagen a Cloudinary...');
        const uploadRes = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          body: fileData,
        });

        if (!uploadRes.ok) {
          throw new Error('Error al subir la imagen al servidor');
        }

        const uploadResult = await uploadRes.json();
        console.log('Resultado upload:', uploadResult);
        imageUrl = uploadResult.url;
      }

      if (!imageUrl) {
        throw new Error('No se pudo obtener la URL de la imagen');
      }

      const tattooPayload = { ...formData, image_url: imageUrl };
      const token = authService.getToken();

      console.log('Enviando payload al backend:', tattooPayload);

      if (editingTattoo) {
        await tattoosService.update(editingTattoo.id, tattooPayload, token);
        alert('Tatuaje actualizado correctamente');
      } else {
        await tattoosService.create(tattooPayload, token);
        alert('Tatuaje publicado con éxito');
      }
      
      setIsModalOpen(false);
      setFormData({ title: '', style: '', description: '' });
      setSelectedImage(null);
      
      setTimeout(() => {
        loadTattoos();
      }, 500);
    } catch (err) {
      console.error('Error en handleSubmit:', err);
      alert('Error en la operación: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-8 md:mb-16 gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-2">Galería</h2>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-[10px] md:text-xs">Portafolio Profesional</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
        {isAdmin && (
          <button 
            onClick={() => handleOpenModal()}
            className="group relative aspect-[4/5] bg-gray-900 rounded-2xl md:rounded-3xl border-2 border-dashed border-gray-800 hover:border-purple-500/50 transition-all flex flex-col items-center justify-center gap-4 overflow-hidden"
          >
            <div className="p-4 md:p-6 bg-gray-800 rounded-full group-hover:bg-purple-600 transition-colors duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-gray-500 font-black uppercase tracking-widest text-xs md:text-sm group-hover:text-white transition-colors">Agregar Trabajo</span>
            <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        )}

        {tattoos.map((tattoo) => (
          <TattooCard 
            key={tattoo.id} 
            tattoo={tattoo} 
            isAdmin={isAdmin}
            onDelete={handleDelete}
            onEdit={handleOpenModal}
          />
        ))}

        {tattoos.length === 0 && !isAdmin && (
          <div className="col-span-full text-center py-20 bg-gray-900/50 rounded-3xl border border-gray-800">
            <p className="text-gray-400 text-xl font-medium">Nuestra galería se está actualizando. Vuelve pronto.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-gray-900 border border-gray-800 w-full max-w-xl rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 md:p-10">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
                  {editingTattoo ? 'Editar Trabajo' : 'Nuevo Tatuaje'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Título</label>
                    <input 
                      type="text" value={formData.title} 
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full p-4 bg-gray-800 border border-gray-700 text-white rounded-2xl outline-none focus:border-purple-500 transition-all" required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Estilo</label>
                    <input 
                      type="text" value={formData.style} 
                      onChange={(e) => setFormData({...formData, style: e.target.value})}
                      className="w-full p-4 bg-gray-800 border border-gray-700 text-white rounded-2xl outline-none focus:border-purple-500 transition-all" required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Descripción</label>
                  <textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-4 bg-gray-800 border border-gray-700 text-white rounded-2xl outline-none focus:border-purple-500 h-24 resize-none transition-all" required
                  />
                </div>
                
                <div className="relative group border-2 border-dashed border-gray-700 p-8 rounded-2xl text-center hover:border-purple-500/50 transition-all cursor-pointer bg-gray-800/50">
                  <input 
                    type="file" accept="image/*" 
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 mx-auto group-hover:text-purple-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                      {selectedImage ? selectedImage.name : editingTattoo ? 'Cambiar Imagen (Opcional)' : 'Subir Imagen'}
                    </p>
                  </div>
                </div>

                <button 
                  disabled={uploading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-2xl shadow-purple-600/30 disabled:opacity-50 transition-all flex justify-center items-center gap-3"
                >
                  {uploading ? (
                    <>
                      <div className="h-5 w-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Procesando...
                    </>
                  ) : editingTattoo ? 'Guardar Cambios' : 'Publicar Trabajo'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TattooGallery;
