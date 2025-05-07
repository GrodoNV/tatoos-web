import { useState } from "react";
import { Phone, Mail, MapPin, Send, AlertCircle } from "lucide-react";

const ContactPage = () => {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoTatuaje: "personalizado",
    tamano: "pequeno",
    ubicacion: "",
    descripcion: "",
    referencia: "",
  });
  
  // Estado para mensajes de validación
  const [errors, setErrors] = useState({});
  // Estado para mensaje de éxito
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // Estado para errores de envío
  const [submitError, setSubmitError] = useState("");
  // Estado para indicar que está enviando
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
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
    
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar antes de enviar
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // Aquí irá la lógica para enviar a Telegram o Email
      // Por ahora simulamos una llamada API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Resetear el formulario después del envío exitoso
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        tipoTatuaje: "personalizado",
        tamano: "pequeno",
        ubicacion: "",
        descripcion: "",
        referencia: "",
      });
      
      setSubmitSuccess(true);
      
      // Ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitError("Hubo un problema al enviar tu solicitud. Por favor, intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative bg-black py-16">
        <div className="absolute inset-0 opacity-30 bg-[url('/images/tattoo-bg.jpg')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Agenda tu Consulta</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cuéntanos sobre el tatuaje de tus sueños y nos pondremos en contacto contigo para hacer realidad tu idea.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Información de contacto */}
          <div className="lg:col-span-1 bg-gray-800 p-8 rounded-sm">
            <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="mr-4 text-red-500" size={24} />
                <div>
                  <h3 className="font-semibold">Ubicación</h3>
                  <p className="text-gray-400 mt-1">Av. Revolución 123, Col. Condesa, CDMX</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="mr-4 text-red-500" size={24} />
                <div>
                  <h3 className="font-semibold">Teléfono</h3>
                  <p className="text-gray-400 mt-1">(+52) 55 1234 5678</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="mr-4 text-red-500" size={24} />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-400 mt-1">info@inkmaster.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Horario de Atención</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex justify-between">
                  <span>Lunes</span>
                  <span>Cerrado</span>
                </p>
                <p className="flex justify-between">
                  <span>Martes - Viernes</span>
                  <span>12:00 - 21:00</span>
                </p>
                <p className="flex justify-between">
                  <span>Sábado</span>
                  <span>10:00 - 18:00</span>
                </p>
                <p className="flex justify-between">
                  <span>Domingo</span>
                  <span>Cerrado</span>
                </p>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-red-500 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-red-500 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-red-500 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Formulario de contacto */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 p-8 rounded-sm">
              <h2 className="text-2xl font-bold mb-6">Formulario de Consulta</h2>
              
              {/* Mensaje de éxito */}
              {submitSuccess && (
                <div className="mb-6 bg-green-800 text-white p-4 rounded-sm flex items-center">
                  <div className="mr-3 text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>¡Tu solicitud ha sido enviada con éxito! Nos pondremos en contacto contigo pronto.</p>
                </div>
              )}
              
              {/* Mensaje de error */}
              {submitError && (
                <div className="mb-6 bg-red-900 text-white p-4 rounded-sm flex items-center">
                  <AlertCircle className="mr-3 text-red-400" size={24} />
                  <p>{submitError}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="nombre" className="block text-gray-300 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`w-full bg-gray-700 border ${
                        errors.nombre ? "border-red-500" : "border-gray-600"
                      } rounded-sm px-4 py-3 focus:outline-none focus:border-red-500`}
                      placeholder="Tu nombre"
                    />
                    {errors.nombre && <p className="mt-1 text-red-500 text-sm">{errors.nombre}</p>}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-gray-700 border ${
                        errors.email ? "border-red-500" : "border-gray-600"
                      } rounded-sm px-4 py-3 focus:outline-none focus:border-red-500`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  
                  {/* Teléfono */}
                  <div>
                    <label htmlFor="telefono" className="block text-gray-300 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={`w-full bg-gray-700 border ${
                        errors.telefono ? "border-red-500" : "border-gray-600"
                      } rounded-sm px-4 py-3 focus:outline-none focus:border-red-500`}
                      placeholder="Tu número de teléfono"
                    />
                    {errors.telefono && <p className="mt-1 text-red-500 text-sm">{errors.telefono}</p>}
                  </div>
                  
                  {/* Tipo de Tatuaje */}
                  <div>
                    <label htmlFor="tipoTatuaje" className="block text-gray-300 mb-2">
                      Tipo de Tatuaje
                    </label>
                    <select
                      id="tipoTatuaje"
                      name="tipoTatuaje"
                      value={formData.tipoTatuaje}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-sm px-4 py-3 focus:outline-none focus:border-red-500"
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
                  </div>
                  
                  {/* Tamaño */}
                  <div>
                    <label htmlFor="tamano" className="block text-gray-300 mb-2">
                      Tamaño aproximado
                    </label>
                    <select
                      id="tamano"
                      name="tamano"
                      value={formData.tamano}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-sm px-4 py-3 focus:outline-none focus:border-red-500"
                    >
                      <option value="pequeno">Pequeño (hasta 5 cm)</option>
                      <option value="mediano">Mediano (5-15 cm)</option>
                      <option value="grande">Grande (15-30 cm)</option>
                      <option value="muyGrande">Muy grande (más de 30 cm)</option>
                      <option value="mediaManga">Media manga</option>
                      <option value="mangaCompleta">Manga completa</option>
                      <option value="espalda">Espalda completa</option>
                    </select>
                  </div>
                  
                  {/* Ubicación */}
                  <div>
                    <label htmlFor="ubicacion" className="block text-gray-300 mb-2">
                      Ubicación en el cuerpo *
                    </label>
                    <input
                      type="text"
                      id="ubicacion"
                      name="ubicacion"
                      value={formData.ubicacion}
                      onChange={handleChange}
                      className={`w-full bg-gray-700 border ${
                        errors.ubicacion ? "border-red-500" : "border-gray-600"
                      } rounded-sm px-4 py-3 focus:outline-none focus:border-red-500`}
                      placeholder="Ej: Antebrazo, espalda, etc."
                    />
                    {errors.ubicacion && <p className="mt-1 text-red-500 text-sm">{errors.ubicacion}</p>}
                  </div>
                  
                  {/* Descripción */}
                  <div className="md:col-span-2">
                    <label htmlFor="descripcion" className="block text-gray-300 mb-2">
                      Descripción de tu idea *
                    </label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      rows="4"
                      className={`w-full bg-gray-700 border ${
                        errors.descripcion ? "border-red-500" : "border-gray-600"
                      } rounded-sm px-4 py-3 focus:outline-none focus:border-red-500`}
                      placeholder="Describe con detalle la idea de tu tatuaje"
                    ></textarea>
                    {errors.descripcion && <p className="mt-1 text-red-500 text-sm">{errors.descripcion}</p>}
                  </div>
                  
                  {/* Imagen de referencia */}
                  <div className="md:col-span-2">
                    <label htmlFor="referencia" className="block text-gray-300 mb-2">
                      Imagen de referencia (opcional)
                    </label>
                    <input
                      type="text"
                      id="referencia"
                      name="referencia"
                      value={formData.referencia}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-sm px-4 py-3 focus:outline-none focus:border-red-500"
                      placeholder="URL de una imagen de referencia (si tienes alguna)"
                    />
                    <p className="mt-2 text-sm text-gray-400">
                      Puedes subir tus imágenes a un servicio como Imgur o Google Drive y compartir el enlace aquí.
                    </p>
                  </div>
                  
                  {/* Botón de envío */}
                  <div className="md:col-span-2 mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-sm transition-colors duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send size={18} className="mr-2" />
                          Enviar Consulta
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="w-full h-96 mt-12">
        {/* Aquí iría un mapa real, pero por ahora usamos un placeholder */}
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="mx-auto text-red-500 mb-4" />
            <p className="text-xl font-semibold">Mapa de ubicación</p>
            <p className="text-gray-400">Av. Revolución 123, Col. Condesa, CDMX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;