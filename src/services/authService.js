const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3000/api';

export const authService = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al iniciar sesión');
    }

    const data = await response.json();
    
    // Normalización robusta del usuario y rol
    const userData = data.user || {};
    if (userData.role) {
      userData.role = userData.role.toString().trim().replace(/^[\[\]]+|[\[\]]+$/g, '').toLowerCase();
    }

    localStorage.setItem('admin_token', data.access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    return data;
  },

  logout: async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
      });
    } catch (e) {
      console.error('Logout log failed', e);
    }
    localStorage.removeItem('admin_token');
    localStorage.removeItem('user');
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al registrar');
    }

    return response.json();
  },

  getEmployees: async () => {
    const response = await fetch(`${API_URL}/auth/employees`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
    });
    return response.json();
  },

  updateEmployee: async (id, data) => {
    const response = await fetch(`${API_URL}/auth/employees/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar empleado');
    }
    return response.json();
  },

  deleteEmployee: async (id) => {
    const response = await fetch(`${API_URL}/auth/employees/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar empleado');
    }
    return response.json();
  },

  getLogs: async () => {
    const response = await fetch(`${API_URL}/auth/logs`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
    });
    return response.json();
  },

  getStats: async () => {
    const response = await fetch(`${API_URL}/auth/stats`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
    });
    return response.json();
  },

  logVisit: async (path) => {
    try {
      await fetch(`${API_URL}/auth/visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });
    } catch (e) {}
  },

  getToken: () => {
    return localStorage.getItem('admin_token');
  },

  getUser: () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) return null;
      const parsed = JSON.parse(user);
      // Forzamos normalización al leer por si acaso
      if (parsed && parsed.role) {
        parsed.role = parsed.role.toString().trim().replace(/^[\[\]]+|[\[\]]+$/g, '').toLowerCase();
      }
      return parsed;
    } catch (e) {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('admin_token');
  }
};
