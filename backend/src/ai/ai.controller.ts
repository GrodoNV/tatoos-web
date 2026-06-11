import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatMessageDto } from './dto/chat-message.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body() chatMessageDto: ChatMessageDto) {
    const response = await this.aiService.generateResponse(chatMessageDto);
    return {
      response,
    };
  }
}
