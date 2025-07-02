import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, AlertCircle, Check, ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
const ConsultPage = () => {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoTatuaje: "personalizado",
    tamano: "pequeno",
    ubicacion: "",
    lado: "na",
    descripcion: "",
    referencia: "",
  });

  // Efecto para hacer scroll al inicio cuando se cargue la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Estado para mensajes de validación
  const [errors, setErrors] = useState({});
  // Estado para mensaje de éxito
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // Estado para errores de envío
  const [submitError, setSubmitError] = useState("");
  // Estado para indicar que está enviando
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Opciones para ubicación del cuerpo
  const ubicacionesCorpo = [
    { value: "", label: "Selecciona una ubicación" },
    // Cabeza y cuello
    { value: "cabeza", label: "Cabeza" },
    { value: "frente", label: "Frente" },
    { value: "cuero_cabelludo", label: "Cuero cabelludo" },
    { value: "detras_oreja", label: "Detrás de la oreja" },
    { value: "cuello_frontal", label: "Cuello frontal" },
    { value: "cuello_lateral", label: "Cuello lateral" },
    { value: "nuca", label: "Nuca" },
    
    // Torso frontal
    { value: "pecho", label: "Pecho" },
    { value: "clavicula", label: "Clavícula" },
    { value: "costillas", label: "Costillas" },
    { value: "abdomen", label: "Abdomen" },
    { value: "estomago", label: "Estómago" },
    
    // Torso posterior
    { value: "espalda_alta", label: "Espalda alta" },
    { value: "espalda_media", label: "Espalda media" },
    { value: "espalda_baja", label: "Espalda baja" },
    { value: "espalda_completa", label: "Espalda completa" },
    { value: "omoplato", label: "Omóplato" },
    
    // Brazos
    { value: "hombro", label: "Hombro" },
    { value: "brazo_completo", label: "Brazo completo" },
    { value: "biceps", label: "Bíceps" },
    { value: "triceps", label: "Tríceps" },
    { value: "antebrazo", label: "Antebrazo" },
    { value: "codo", label: "Codo" },
    { value: "muneca", label: "Muñeca" },
    
    // Manos
    { value: "mano", label: "Mano" },
    { value: "dedos", label: "Dedos" },
    { value: "nudillos", label: "Nudillos" },
    
    // Piernas
    { value: "muslo", label: "Muslo" },
    { value: "rodilla", label: "Rodilla" },
    { value: "pantorrilla", label: "Pantorrilla" },
    { value: "tibia", label: "Tibia" },
    { value: "tobillo", label: "Tobillo" },
    { value: "pierna_completa", label: "Pierna completa" },
    
    // Pies
    { value: "pie", label: "Pie" },
    { value: "empeine", label: "Empeine" },
    { value: "planta_pie", label: "Planta del pie" },
    { value: "dedos_pie", label: "Dedos del pie" },
    
    // Otras áreas
    { value: "gluteos", label: "Glúteos" },
    { value: "cadera", label: "Cadera" },
    { value: "ingle", label: "Ingle" },
    { value: "axila", label: "Axila" },
  ];

  // Determinar si la ubicación necesita especificar lado
  const necesitaLado = (ubicacion) => {
    const ubicacionesBilaterales = [
      'detras_oreja', 'cuello_lateral', 'clavicula', 'costillas', 'omoplato', 
      'hombro', 'brazo_completo', 'biceps', 'triceps', 'antebrazo', 'codo', 
      'muneca', 'mano', 'dedos', 'nudillos', 'muslo', 'rodilla', 'pantorrilla', 
      'tibia', 'tobillo', 'pierna_completa', 'pie', 'empeine', 'planta_pie', 
      'dedos_pie', 'gluteos', 'cadera', 'ingle', 'axila'
    ];
    return ubicacionesBilaterales.includes(ubicacion);
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si cambia la ubicación, resetear el lado
    if (name === 'ubicacion') {
      setFormData({
        ...formData,
        [name]: value,
        lado: necesitaLado(value) ? "" : "na"
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    }
    
    if (!formData.ubicacion.trim()) {
      newErrors.ubicacion = "La ubicación del tatuaje es obligatoria";
    }
    
    if (necesitaLado(formData.ubicacion) && !formData.lado) {
      newErrors.lado = "Especifica el lado para esta ubicación";
    }
    
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Traducir las opciones seleccionadas a texto legible
  const getTipoTatuajeText = (tipo) => {
    const tipos = {
      personalizado: "Diseño Personalizado",
      flash: "Diseño Flash",
      lettering: "Lettering/Tipografía",
      coverup: "Cover Up",
      realista: "Realista",
      tradicional: "Tradicional",
      neotradicional: "Neotradicional",
      blackwork: "Blackwork",
      geometrico: "Geométrico",
      acuarela: "Acuarela",
      otro: "Otro"
    };
    return tipos[tipo] || tipo;
  };

  const getTamanoText = (tamano) => {
    const tamanos = {
      pequeno: "Pequeño (hasta 5 cm)",
      mediano: "Mediano (5-15 cm)",
      grande: "Grande (15-30 cm)",
      muyGrande: "Muy grande (más de 30 cm)",
      mediaManga: "Media manga",
      mangaCompleta: "Manga completa",
      espalda: "Espalda completa"
    };
    return tamanos[tamano] || tamano;
  };

  const getUbicacionText = (ubicacion) => {
    const ubicacionObj = ubicacionesCorpo.find(u => u.value === ubicacion);
    return ubicacionObj ? ubicacionObj.label : ubicacion;
  };

  const getLadoText = (lado) => {
    const lados = {
      izquierdo: "Lado izquierdo",
      derecho: "Lado derecho",
      na: "No aplica"
    };
    return lados[lado] || lado;
  };

  // Enviar el formulario a WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const whatsappNumber = "59175233602";
      
      const ladoInfo = necesitaLado(formData.ubicacion) ? `\n*Lado:* ${getLadoText(formData.lado)}` : '';
      
      const message = `*NUEVA CONSULTA DE TATUAJE*
      
*Nombre:* ${formData.nombre}
*Email:* ${formData.email}
*Teléfono:* ${formData.telefono}
*Tipo de Tatuaje:* ${getTipoTatuajeText(formData.tipoTatuaje)}
*Tamaño:* ${getTamanoText(formData.tamano)}
*Ubicación:* ${getUbicacionText(formData.ubicacion)}${ladoInfo}
*Descripción:* ${formData.descripcion}
${formData.referencia ? `*Referencia:* ${formData.referencia}` : ''}`;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
      // Resetear el formulario
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        tipoTatuaje: "personalizado",
        tamano: "pequeno",
        ubicacion: "",
        lado: "na",
        descripcion: "",
        referencia: "",
      });
      
    } catch (error) {
      console.error("Error al abrir WhatsApp:", error);
      setSubmitError("Hubo un problema al abrir WhatsApp. Por favor, intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&family=Great+Vibes&family=Lato:wght@300;400;700&family=Ruthie&display=swap" rel="stylesheet" />

      {/* Hero Section con gradiente mejorado */}
      <div className="relative overflow-hidden bg-black ">
 

  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-zinc-900/70 to-black/90"></div>

  <div className="relative px-4 py-20 md:py-32">
    <div className="max-w-4xl mx-auto text-center">
      <h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-400 bg-clip-text text-transparent"
        style={{ fontFamily: 'UnifrakturCook, cursive' }}
      >
        Agenda tu Consulta
      </h1>
      <p
        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
        style={{ fontFamily: 'Lato, sans-serif' }}
      >
        Cuéntanos sobre el tatuaje de tus sueños y nos pondremos en contacto contigo para hacerlo realidad.
      </p>
      <div className="mt-8 flex justify-center">
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-400 rounded-full shadow-md"></div>
      </div>
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Información de contacto */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 md:p-8 rounded-2xl shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-yellow-400"
                style={{ fontFamily: 'Great Vibes, cursive' }}>Información de Contacto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="bg-yellow-500/20 p-3 rounded-xl mr-4 group-hover:bg-yellow-500/30 transition-colors">
                    <MapPin className="text-yellow-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ fontFamily: 'Lato, sans-serif' }}>Ubicación</h3>
                    <p className="text-gray-400 mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>Av. Revolución 123, Col. Condesa, CDMX</p>
                  </div>
                </div>
                
                <div className="flex items-start group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="bg-yellow-500/20 p-3 rounded-xl mr-4 group-hover:bg-yellow-500/30 transition-colors">
                    <Phone className="text-yellow-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ fontFamily: 'Lato, sans-serif' }}>Teléfono</h3>
                    <p className="text-gray-400 mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>(+52) 55 1234 5678</p>
                  </div>
                </div>
                
                <div className="flex items-start group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="bg-yellow-500/20 p-3 rounded-xl mr-4 group-hover:bg-yellow-500/30 transition-colors">
                    <Mail className="text-yellow-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ fontFamily: 'Lato, sans-serif' }}>Email</h3>
                    <p className="text-gray-400 mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>info@inkmaster.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-6 text-yellow-400" style={{ fontFamily: 'Great Vibes, cursive' }}>Horario de Atención</h3>
                <div className="space-y-3">
                  {[
                    { dia: "Lunes", horario: "Cerrado" },
                    { dia: "Martes - Viernes", horario: "12:00 - 21:00" },
                    { dia: "Sábado", horario: "10:00 - 18:00" },
                    { dia: "Domingo", horario: "Cerrado" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700/30">
                      <span className="text-gray-300" style={{ fontFamily: 'Lato, sans-serif' }}>{item.dia}</span>
                      <span className={`font-medium ${item.horario === "Cerrado" ? "text-red-400" : "text-green-400"}`}
                        style={{ fontFamily: 'Lato, sans-serif' }}>
                        {item.horario}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-10">
  <h3 className="text-xl font-semibold mb-6 text-yellow-400" style={{ fontFamily: 'Great Vibes, cursive' }}>
    Síguenos
  </h3>
<div className="flex space-x-4">
  {/* TikTok */}
  <a
    href="https://www.tiktok.com/@usuario"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-black text-white p-3 rounded-xl transition-transform duration-300 hover:scale-110 hover:bg-[#69C9D0]"
    aria-label="TikTok"
  >
    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M41,14.4c-4.4,0-8-3.6-8-8h-5v27c0,2.8-2.2,5-5,5s-5-2.2-5-5s2.2-5,5-5c0.7,0,1.4,0.2,2,0.4V22.9c-0.7-0.1-1.3-0.2-2-0.2c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10v-14c2.3,1.8,5.2,2.9,8.3,2.9V14.4z"/>
    </svg>
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/tu-pagina"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-[#1877F2] text-white p-3 rounded-xl transition-transform duration-300 hover:scale-110 hover:bg-[#156ACF]"
    aria-label="Facebook"
  >
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.03H8.07v-2.9h2.37V9.85c0-2.34 1.4-3.63 3.52-3.63 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.76h2.59l-.41 2.9h-2.18v7.03C18.34 21.2 22 17.07 22 12.07z"/>
    </svg>
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/tuusuario"
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-xl bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white transition-transform duration-300 hover:scale-110 hover:brightness-110"
    aria-label="Instagram"
  >
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.75a.75.75 0 110 1.5.75.75 0 010-1.5z"/>
    </svg>
  </a>
</div>

</div>

            </div>
          </div>
          
          {/* Formulario de contacto */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 md:p-8 rounded-2xl shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-yellow-400"
                style={{ fontFamily: 'UnifrakturCook, cursive' }}>Formulario de Consulta</h2>
              
              {/* Mensaje de éxito */}
              {submitSuccess && (
                <div className="mb-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-white p-4 rounded-xl flex items-center backdrop-blur-sm">
                  <div className="bg-green-500/20 p-2 rounded-full mr-3">
                    <Check className="text-green-400" size={20} />
                  </div>
                  <p className="font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>¡Tu solicitud ha sido enviada con éxito! Se ha abierto WhatsApp con tu información.</p>
                </div>
              )}
              
              {/* Mensaje de error */}
              {submitError && (
                <div className="mb-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-white p-4 rounded-xl flex items-center backdrop-blur-sm">
                  <div className="bg-red-500/20 p-2 rounded-full mr-3">
                    <AlertCircle className="text-red-400" size={20} />
                  </div>
                  <p className="font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>{submitError}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="block text-gray-300 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`w-full bg-gray-700/50 backdrop-blur-sm border ${
                        errors.nombre ? "border-red-500" : "border-gray-600/50"
                      } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 placeholder-gray-400`}
                      placeholder="Tu nombre completo"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                    />
                    {errors.nombre && <p className="text-red-400 text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>{errors.nombre}</p>}
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-gray-300 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-gray-700/50 backdrop-blur-sm border ${
                        errors.email ? "border-red-500" : "border-gray-600/50"
                      } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 placeholder-gray-400`}
                      placeholder="tu@email.com"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                    />
                    {errors.email && <p className="text-red-400 text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>{errors.email}</p>}
                  </div>
                  
                  {/* Teléfono */}
                  <div className="space-y-2">
                    <label htmlFor="telefono" className="block text-gray-300 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                      Número de WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={`w-full bg-gray-700/50 backdrop-blur-sm border ${
                        errors.telefono ? "border-red-500" : "border-gray-600/50"
                      } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 placeholder-gray-400`}
                      placeholder="Ej: +591 75233602"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                    />
                    {errors.telefono && <p className="text-red-400 text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>{errors.telefono}</p>}
                  </div>
                  
                  {/* Tipo de Tatuaje */}
                  <div className="space-y-2">
                    <label htmlFor="tipoTatuaje" className="block text-gray-300 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                      Tipo de Tatuaje
                    </label>
                    <div className="relative">
                      <select
                        id="tipoTatuaje"
                        name="tipoTatuaje"
                        value={formData.tipoTatuaje}
                        onChange={handleChange}
                        className="w-full bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 appearance-none"
                        style={{ fontFamily: 'Lato, sans-serif' }}
                      >
                        <option value="personalizado">Diseño Personalizado</option>
                        <option value="flash">Diseño Flash</option>
                        <option value="lettering">Lettering/Tipografía</option>
                        <option value="coverup">Cover Up</option>
                        <option value="realista">Realista</option>
                        <option value="tradicional">Tradicional</option>
                        <option value="neotradicional">Neotradicional</option>
                        <option value="blackwork">Blackwork</option>
                        <option value="geometrico">Geométrico</option>
                        <option value="acuarela">Acuarela</option>
                        <option value="otro">Otro</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>
                  
                  {/* Tamaño */}
                  <div className="space-y-2">
                    <label htmlFor="tamano" className="block text-gray-300 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                      Tamaño aproximado
                    </label>
                    <div className="relative">
                      <select
                        id="tamano"
                        name="tamano"
                        value={formData.tamano}
                        onChange={handleChange}
                        className="w-full bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 appearance-none"
                        style={{ fontFamily: 'Lato, sans-serif' }}
                      >
                        <option value="pequeno">Pequeño (hasta 5 cm)</option>
                        <option value="mediano">Mediano (5-15 cm)</option>
                        <option value="grande">Grande (15-30 cm)</option>
                        <option value="muyGrande">Muy grande (más de 30 cm)</option>
                        <option value="mediaManga">Media manga</option>
                        <option value="mangaCompleta">Manga completa</option>
                        <option value="espalda">Espalda completa</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>
                  
                  {/* Ubicación en el cuerpo */}
                  <div className="space-y-2">
                    <label htmlFor="ubicacion" className="block text-gray-300 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                      Ubicación en el cuerpo *
                    </label>
                    <div className="relative">
                      <select
                        id="ubicacion"
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={handleChange}
                        className={`w-full bg-gray-700/50 backdrop-blur-sm border ${
                          errors.ubicacion ? "border-red-500" : "border-gray-600/50"
                        } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 appearance-none`}
                        style={{ fontFamily: 'Lato, sans-serif' }}
                      >
                        {ubicacionesCorpo.map((ubicacion) => (
                          <option key={ubicacion.value} value={ubicacion.value}>
                            {ubicacion.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                    {errors.ubicacion && <p className="text-red-400 text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>{errors.ubicacion}</p>}
                  </div>
                  
                  {/* Lado (solo si es necesario) */}
                  {necesitaLado(formData.ubicacion) && (
                    <div className="space-y-2">
                      <label htmlFor="lado" className="block text-gray-300 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                        ¿Qué lado? *
                      </label>
                      <div className="relative">
                        <select
                          id="lado"
                          name="lado"
                          value={formData.lado}
                          onChange={handleChange}
                          className={`w-full bg-gray-700/50 backdrop-blur-sm border ${
                            errors.lado ? "border-red-500" : "border-gray-600/50"
                          } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 appearance-none`}
                          style={{ fontFamily: 'Lato, sans-serif' }}
                        >
                          <option value="">Selecciona un lado</option>
                          <option value="izquierdo">Lado izquierdo</option>
                          <option value="derecho">Lado derecho</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                      </div>
                      {errors.lado && <p className="text-red-400 text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>{errors.lado}</p>}
                    </div>
                  )}
                </div>
                
                {/* Descripción */}
                <div className="space-y-2">
                  <label htmlFor="descripcion" className="block text-gray-300 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Descripción de tu idea *
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full bg-gray-700/50 backdrop-blur-sm border ${
                      errors.descripcion ? "border-red-500" : "border-gray-600/50"
                    } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 placeholder-gray-400 resize-none`}
                    placeholder="Describe con detalle la idea de tu tatuaje: estilo, colores, elementos que quieres incluir, inspiración, etc."
                    style={{ fontFamily: 'Lato, sans-serif' }}
                  ></textarea>
                  {errors.descripcion && <p className="text-red-400 text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>{errors.descripcion}</p>}
                </div>
                
                {/* Imagen de referencia */}
                <div className="space-y-2">
                  <label htmlFor="referencia" className="block text-gray-300 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Imagen de referencia (opcional)
                  </label>
                  <input
                    type="text"
                    id="referencia"
                    name="referencia"
                    value={formData.referencia}
                    onChange={handleChange}
                    className="w-full bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 placeholder-gray-400"
                    placeholder="https://ejemplo.com/tu-imagen.jpg"
                    style={{ fontFamily: 'Lato, sans-serif' }}
                  />
                  <p className="text-sm text-gray-400" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Puedes subir tus imágenes a un servicio como Imgur, Google Drive o Dropbox y compartir el enlace aquí.
                  </p>
                </div>
                

<div className="pt-6">
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full px-6 py-3 sm:px-6 sm:py-3
               bg-green-500 hover:bg-green-600 text-white
               font-semibold rounded-full shadow-lg
               transition-all duration-300 text-base sm:text-lg transform 
               hover:scale-105 active:scale-95
               disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
    style={{ fontFamily: 'Lato, sans-serif' }}
  >
    {isSubmitting ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Enviando...
      </>
    ) : (
      <>
        <FaWhatsapp className="mr-3 text-white w-5 h-5" />
        Enviar consulta por WhatsApp
      </>
    )}
  </button>
</div>

              </form>
            </div>
          </div>
        </div>
      </div>
      
 {/* Map Section mejorado y 100% responsive */}
<div className="relative px-4 sm:px-6 lg:px-8">
  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 pointer-events-none"></div>

  <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl mb-12">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.844621063799!2d-99.17472798509091!3d19.39100344679364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff4908c9c7d7%3A0xf6355465bd4dd3db!2sAv.%20Revoluci%C3%B3n%20123%2C%20Condesa%2C%20Cuauht%C3%A9moc%2C%2006100%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20M%C3%A9xico!5e0!3m2!1ses!2sbo!4v1719433776725!5m2!1ses!2sbo"
      width="100%"
      height="100%"
      style={{
        border: 0,
        filter: "grayscale(20%) contrast(120%)",
      }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Ubicación Villanos Tattoo"
    ></iframe>
  </div>
</div>


    </div>
  );
};

export default ConsultPage;