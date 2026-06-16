import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  Users, Activity, LogOut, Shield, UserPlus, FileText, TrendingUp, CheckCircle, Smartphone, Edit, Trash2, X, Save, Globe, Monitor, Eye, EyeOff
} from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState({ totalVisits: 0, totalEmployees: 0, chartData: [] });
  const [employees, setEmployees] = useState([]);
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [statsData, employeesData, logsData] = await Promise.all([
        authService.getStats().catch(() => ({ totalVisits: 0, totalEmployees: 0, chartData: [] })),
        authService.getEmployees().catch(() => []),
        authService.getLogs().catch(() => [])
      ]);
      setStats(statsData);
      setEmployees(Array.isArray(employeesData) ? employeesData : []);
      setLogs(Array.isArray(logsData) ? logsData : []);
    } catch (err) {
      console.error('Error cargando datos:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRoleDisplay = (role) => {
    if (!role) return 'Sin rol';
    return role.toLowerCase() === 'employee' ? 'Tatuador' : role;
  };

  useEffect(() => {
    const user = authService.getUser();
    const token = authService.getToken();

    if (!token || !user) {
      navigate('/admin');
      return;
    }

    const role = user.role?.toLowerCase();
    const isSuperAdmin = user.email === 'admin@admin.com';

    if (role !== 'admin' && !isSuperAdmin) {
      setErrorStatus(`Tu cuenta (${user.email}) tiene el rol "${role || 'ninguno'}". Necesitas rol "admin" para entrar.`);
      setTimeout(() => navigate('/'), 5000);
      return;
    }

    fetchData();
  }, [navigate]);

  const [isEditing, setIsEditing] = useState(null); 
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'tatuador' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = async () => {
    await authService.logout();
    navigate('/admin');
  };

  const handleRegisterOrUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    console.log('Iniciando registro/actualización con:', formData);
    
    try {
      const dataToSend = { ...formData, role: 'tatuador' };
      
      let result;
      if (isEditing) {
        result = await authService.updateEmployee(isEditing, dataToSend);
        setSuccess('Tatuador actualizado correctamente');
        console.log('Update result:', result);
      } else {
        result = await authService.register(dataToSend);
        setSuccess('Nuevo tatuador registrado con éxito');
        console.log('Register result:', result);
      }
      
      // Limpiar formulario y refrescar lista
      setFormData({ name: '', email: '', password: '', role: 'tatuador' });
      setIsEditing(null);
      setShowPassword(false);
      
      console.log('Refrescando lista de tatuadores...');
      await fetchData();
      
    } catch (err) {
      console.error('ERROR EN OPERACIÓN:', err);
      setError(err.message || 'Ocurrió un error inesperado');
    }
  };

  const handleEdit = (emp) => {
    setIsEditing(emp.id);
    setFormData({ name: emp.name, email: emp.email, password: '', role: 'tatuador' });
    setActiveTab('employees');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar a este tatuador?')) {
      try {
        await authService.deleteEmployee(id);
        setEmployees(prev => prev.filter(e => e.id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: 'Ninguna', color: 'bg-gray-800', width: '0%', text: 'text-gray-500' };
    if (pwd.length < 6) return { label: 'Muy Débil', color: 'bg-red-600', width: '20%', text: 'text-red-600' };
    if (pwd.length < 8) return { label: 'Débil', color: 'bg-orange-500', width: '40%', text: 'text-orange-500' };
    
    const hasLetters = /[a-zA-Z]/.test(pwd);
    const hasNumbers = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    if (hasLetters && hasNumbers && hasSpecial && pwd.length >= 10) {
      return { label: 'Fuerte', color: 'bg-green-500', width: '100%', text: 'text-green-500' };
    }
    if (hasLetters && hasNumbers) {
      return { label: 'Intermedia', color: 'bg-yellow-500', width: '70%', text: 'text-yellow-500' };
    }
    return { label: 'Débil', color: 'bg-orange-500', width: '40%', text: 'text-orange-500' };
  };

  const strength = getPasswordStrength(formData.password);

// REQUERIMIENTO: Reporte en PDF Completo
const exportPDF = () => {
  const doc = new jsPDF();

  // Encabezado Estilizado
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setFontSize(22);
  doc.setTextColor(234, 179, 8); // Amarillo Villanos
  doc.text('VILLANOS TATTOO - AUDITORÍA DE SISTEMA', 14, 25);

  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generado el: ${new Date().toLocaleString()}`, 14, 34);

  // SECCIÓN 1: MÉTRICAS GENERALES
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text('1. Resumen de Actividad', 14, 55);

  autoTable(doc, {
    startY: 60,
    head: [['Métrica', 'Valor']],
    body: [
      ['Total de Visitas (Histórico)', stats.totalVisits],
      ['Personal Registrado', stats.totalEmployees],
      ['Estado del Servidor', 'Operacional / Online']
    ],
    theme: 'grid',
    headStyles: { fillColor: [234, 179, 8], textColor: [0, 0, 0] }
  });

  // SECCIÓN 2: EVOLUCIÓN DE VISITAS (Datos del Gráfico)
  doc.text('2. Evolución de Visitas (Últimos 7 días)', 14, doc.lastAutoTable.finalY + 15);

  const chartBody = stats.chartData.map(d => [d.date, d.visits]);
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Fecha', 'Visitas']],
    body: chartBody,
    theme: 'striped',
    headStyles: { fillColor: [50, 50, 50] }
  });

  // SECCIÓN 3: LOGS DE AUDITORÍA (Últimos 20)
  if (logs.length > 0) {
    doc.addPage();
    doc.setFontSize(14);
    doc.text('3. Registros de Acceso y Seguridad (Logs)', 14, 20);

    const logsBody = logs.slice(0, 20).map(log => [
      log.email || 'Anónimo',
      log.event.toUpperCase(),
      log.ip,
      new Date(log.timestamp).toLocaleString()
    ]);

    autoTable(doc, {
      startY: 25,
      head: [['Usuario/Referencia', 'Evento', 'IP', 'Fecha/Hora']],
      body: logsBody,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [234, 179, 8], textColor: [0, 0, 0] }
    });
  }

  doc.save(`auditoria_villanos_${new Date().getTime()}.pdf`);
};

  if (errorStatus) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-center max-w-md">
          <Shield size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white uppercase mb-2">Acceso Denegado</h2>
          <p className="text-gray-400">{errorStatus}</p>
          <p className="text-xs text-gray-600 mt-4 italic">Redirigiendo a inicio...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-yellow-500 rounded-full animate-spin mb-4"></div>
        <p className="text-white font-black tracking-widest text-xs uppercase italic">Accediendo a la red...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col lg:flex-row font-sans">
      {/* Mobile Tab Navigation - Pulida y Moderna */}
      <div className="lg:hidden bg-gray-950/80 backdrop-blur-md border-b border-white/5 sticky top-[80px] z-40">
        <div className="flex justify-around items-center px-2">
          {[
            { id: 'stats', label: 'Stats', icon: <TrendingUp size={18} /> },
            { id: 'employees', label: 'Staff', icon: <Users size={18} /> },
            { id: 'logs', label: 'Logs', icon: <Activity size={18} /> }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              className={`flex flex-col items-center gap-1 px-4 py-3 transition-all duration-300 relative ${
                activeTab === tab.id ? 'text-yellow-500' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.icon}
              <span className="text-[10px] font-black uppercase tracking-tighter">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 shadow-[0_-4px_10px_rgba(234,179,8,0.5)]" />
              )}
            </button>
          ))}
          <button 
            onClick={handleLogout} 
            className="flex flex-col items-center gap-1 px-4 py-3 text-red-500/70 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Salir</span>
          </button>
        </div>
      </div>

      <aside className="w-72 bg-gray-900 border-r border-white/5 flex flex-col hidden lg:flex">
        <div className="p-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center">
              <Shield size={28} className="text-black" />
            </div>
            <h2 className="text-xl font-black uppercase italic text-yellow-500">Villanos</h2>
          </div>
          <nav className="space-y-3">
            <button onClick={() => setActiveTab('stats')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'stats' ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:bg-white/5'}`}>
              <TrendingUp size={20} /> Rendimiento
            </button>
            <button onClick={() => setActiveTab('employees')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'employees' ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:bg-white/5'}`}>
              <Users size={20} /> Tatuadores
            </button>
            <button onClick={() => setActiveTab('logs')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'logs' ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:bg-white/5'}`}>
              <Activity size={20} /> IPs / Logs
            </button>
          </nav>
        </div>
        <div className="mt-auto p-8">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 py-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all font-black text-xs uppercase tracking-widest">
            <LogOut size={18} /> Salir
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12 gap-6">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center sm:text-left">Panel de Villanos</h1>
          <button onClick={exportPDF} className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black rounded-2xl text-xs uppercase tracking-widest">PDF Auditoría</button>
        </header>

        {activeTab === 'stats' && (
          <div className="space-y-6 md:space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-center">
              <div className="bg-gray-900 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5"><h3 className="text-gray-500 text-[10px] font-black uppercase mb-2">Visitas</h3><p className="text-4xl md:text-6xl font-black">{stats.totalVisits}</p></div>
              <div className="bg-gray-900 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5"><h3 className="text-gray-500 text-[10px] font-black uppercase mb-2">Tatuadores</h3><p className="text-4xl md:text-6xl font-black">{stats.totalEmployees}</p></div>
              <div className="bg-gray-900 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5 text-green-500"><h3 className="text-gray-500 text-[10px] font-black uppercase mb-2">Status</h3><p className="text-2xl md:text-4xl font-black uppercase">Online</p></div>
            </div>
            <div className="bg-gray-900 p-4 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-white/5 h-[300px] md:h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="date" stroke="#4b5563" fontSize={10} />
                  <YAxis stroke="#4b5563" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#000', borderRadius: '15px', border: 'none' }} />
                  <Line type="monotone" dataKey="visits" stroke="#eab308" strokeWidth={4} dot={{ r: 4, fill: '#eab308' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'employees' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
            <div className="lg:col-span-1 bg-gray-900 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5">
              <h3 className="text-xl md:text-2xl font-black uppercase mb-6">{isEditing ? 'Editar' : 'Nuevo'} Tatuador</h3>
              <form onSubmit={handleRegisterOrUpdate} className="space-y-4">
                <input type="text" placeholder="Nombre" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-gray-800 rounded-xl outline-none text-sm" required />
                <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-4 bg-gray-800 rounded-xl outline-none text-sm" required />
                
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Contraseña" 
                    value={formData.password} 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    className="w-full p-4 bg-gray-800 rounded-xl outline-none pr-12 text-sm" 
                    required={!isEditing} 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                <div className="px-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] uppercase font-black tracking-widest text-gray-500">Seguridad</span>
                    <span className={`text-[9px] uppercase font-black tracking-widest ${strength.text}`}>{strength.label}</span>
                  </div>
                  <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }}></div>
                  </div>
                </div>

                <button className="w-full bg-yellow-500 text-black py-4 rounded-xl font-black uppercase mt-4 text-xs tracking-widest">
                  {isEditing ? 'Actualizar' : 'Registrar'}
                </button>
                {isEditing && <button type="button" onClick={() => { setIsEditing(null); setFormData({name:'', email:'', password:'', role:'tatuador'}); }} className="w-full bg-gray-800 text-white py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest">Cancelar</button>}
              </form>
            </div>
            <div className="lg:col-span-2 bg-gray-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800 text-[10px] uppercase font-black"><tr><th className="p-4 md:p-6 text-left">Tatuador</th><th className="p-4 md:p-6 text-right">Acciones</th></tr></thead>
                  <tbody className="divide-y divide-white/5">
                    {employees.map(emp => (
                      <tr key={emp.id} className="group">
                        <td className="p-4 md:p-6">
                          <div className="font-bold text-xs md:text-sm uppercase">{emp.name}</div>
                          <div className="text-[10px] md:text-xs text-gray-500">{emp.email} <span className="hidden sm:inline text-yellow-500/50">[{getRoleDisplay(emp.role)}]</span></div>
                        </td>
                        <td className="p-4 md:p-6 text-right lg:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(emp)} className="p-2 hover:text-yellow-500"><Edit size={16} /></button>
                          {emp.role !== 'admin' && (
                             <button onClick={() => handleDelete(emp.id)} className="p-2 hover:text-red-500"><Trash2 size={16} /></button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
           <div className="bg-gray-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5">
             <div className="overflow-x-auto">
               <table className="w-full min-w-[600px]">
                 <thead className="bg-gray-800 text-[10px] uppercase font-black"><tr><th className="p-4 md:p-6 text-left">IP / Usuario</th><th className="p-4 md:p-6 text-left">Evento</th><th className="p-4 md:p-6 text-right">Fecha</th></tr></thead>
                 <tbody className="divide-y divide-white/5 text-[10px] md:text-xs">
                   {logs.map(log => (
                     <tr key={log.id}>
                       <td className="p-4 md:p-6"><div className="font-bold">{log.email}</div><div className="text-[9px] md:text-[10px] text-blue-400 font-mono">{log.ip}</div></td>
                       <td className="p-4 md:p-6"><span className={`px-2 md:px-3 py-1 rounded-full ${log.event === 'login' ? 'bg-green-500/10 text-green-500' : 'bg-gray-800'}`}>{log.event}</span></td>
                       <td className="p-4 md:p-6 text-right text-gray-500">{new Date(log.timestamp).toLocaleString()}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
