import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class ChatMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsArray()
  history?: any[];
}
