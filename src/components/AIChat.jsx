import React, { useState, useRef, useEffect } from 'react';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '¡Hola! Soy tu asistente experto en tatuajes. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Guardamos el mensaje actual y el historial para enviar
    const currentMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(currentMessages);
    setLoading(true);

    try {
      // Preparamos el historial (excluyendo el primer mensaje de bienvenida y el último mensaje del usuario)
      const history = messages.slice(1).map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('http://localhost:3000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          history: history 
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error en el servidor');
      }

      setMessages(prev => [...prev, { role: 'assistant', text: data.response || 'No pude procesar tu solicitud.' }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', text: `Error: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Burbuja de chat */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
      >
        {isOpen ? '✖' : '💬 IA Chat'}
      </button>

      {/* Ventana de chat */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-80 h-96 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-purple-600 p-3 text-white font-bold text-sm">
            Asistente del Estudio
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-600">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 p-3 rounded-lg text-xs text-gray-400 animate-pulse">
                  Escribiendo...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-gray-700 bg-gray-800 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta algo..."
              className="flex-1 bg-gray-700 text-white text-sm p-2 rounded outline-none focus:ring-1 focus:ring-purple-500"
            />
            <button type="submit" disabled={loading} className="bg-purple-600 text-white p-2 rounded text-sm hover:bg-purple-700 disabled:opacity-50">
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChat;
