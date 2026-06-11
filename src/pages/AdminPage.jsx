import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const AdminPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadCaptchaEnginge(6);
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateCaptcha(captchaValue)) {
      setError('Captcha incorrecto');
      setCaptchaValue('');
      loadCaptchaEnginge(6);
      return;
    }

    try {
      await authService.login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      loadCaptchaEnginge(6);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="absolute inset-0 bg-purple-600/5 blur-[120px] rounded-full"></div>
      
      <form onSubmit={handleLogin} className="relative bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-800 backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-purple-600/10 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Acceso Admin</h2>
          <p className="text-gray-500 text-sm mt-2">Gestiona tu estudio de tatuajes</p>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-xl text-sm mb-6 border border-red-500/20 animate-pulse">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block">Email</label>
            <input 
              type="email" 
              placeholder="admin@ejemplo.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-800 text-white rounded-xl outline-none border border-transparent focus:border-purple-500 transition-all" 
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-800 text-white rounded-xl outline-none border border-transparent focus:border-purple-500 transition-all" 
              required
            />
          </div>

          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <LoadCanvasTemplate />
            <input 
              type="text" 
              placeholder="Ingresa el captcha" 
              value={captchaValue} 
              onChange={(e) => setCaptchaValue(e.target.value)}
              className="w-full mt-3 p-3 bg-gray-900 text-white rounded-lg outline-none border border-gray-700 focus:border-purple-500 transition-all" 
              required
            />
          </div>
          
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-600/30 transition-all active:scale-95 mt-4">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPage;
