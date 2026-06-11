import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatMessageDto } from './dto/chat-message.dto';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY')?.trim();
    this.genAI = new GoogleGenerativeAI(apiKey || '');
  }

  async generateResponse(chatMessageDto: ChatMessageDto): Promise<string> {
    const { message, history } = chatMessageDto;
    
    try {
      // Usamos el alias que el diagnóstico confirmó que tienes disponible
      const model = this.genAI.getGenerativeModel({ 
        model: 'gemini-flash-latest' 
      });

      const formattedHistory = (history || []).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text || '' }],
      }));

      // Instrucciones más estrictas: Nombre correcto y brevedad máxima
      const systemContext = 'CONTEXTO: Eres el asistente de "Villanos Tattoo". Responde de forma muy breve, directa y profesional. No des rodeos. Solo hablas de tatuajes.\n\n';
      
      const chat = model.startChat({
        history: formattedHistory,
      });

      const result = await chat.sendMessage(systemContext + message);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Error final en Gemini:', error);
      throw new InternalServerErrorException(
        `Error de IA: ${error.message}.`
      );
    }
  }
}
