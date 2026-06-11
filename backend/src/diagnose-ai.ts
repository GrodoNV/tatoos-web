import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import * as path from 'path';

async function diagnose() {
  // Cargar .env desde la carpeta backend
  dotenv.config({ path: path.join(__dirname, '../.env') });
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ No se encontró GEMINI_API_KEY en el .env');
    return;
  }

  console.log('🔍 Diagnosticando modelos disponibles...');
  
  try {
    // Usamos fetch directo a la API de Google para ver qué modelos ve tu llave
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data: any = await response.json();

    if (data.error) {
      console.error('❌ Error de la API:', data.error.message);
      return;
    }

    console.log('\n✅ Modelos disponibles para tu API Key:');
    data.models.forEach((m: any) => {
      console.log(`- ${m.name} (Soporta: ${m.supportedGenerationMethods.join(', ')})`);
    });

    console.log('\n💡 Si "models/gemini-1.5-flash" NO aparece en la lista de arriba, entonces sí necesitaremos una nueva API Key o revisar la región.');
  } catch (err) {
    console.error('❌ Error al conectar:', err.message);
  }
}

diagnose();
