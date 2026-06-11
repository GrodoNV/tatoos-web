const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3000/api';

export const tattoosService = {
  // Obtener todos los tatuajes
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/tattoos`);
      if (!response.ok) throw new Error('Error al obtener los tatuajes');
      return await response.json();
    } catch (error) {
      console.error('Error en tattoosService.getAll:', error);
      return [];
    }
  },

  // Crear un nuevo tatuaje (Requiere token)
  create: async (tattooData, token) => {
    try {
      const response = await fetch(`${API_URL}/tattoos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tattooData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el tatuaje');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en tattoosService.create:', error);
      throw error;
    }
  },

  // Actualizar un tatuaje (Requiere token)
  update: async (id, tattooData, token) => {
    try {
      const response = await fetch(`${API_URL}/tattoos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tattooData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el tatuaje');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en tattoosService.update:', error);
      throw error;
    }
  },

  // Eliminar un tatuaje (Requiere token)
  delete: async (id, token) => {
    try {
      const response = await fetch(`${API_URL}/tattoos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar el tatuaje');
      }

      return true;
    } catch (error) {
      console.error('Error en tattoosService.delete:', error);
      throw error;
    }
  }
};
