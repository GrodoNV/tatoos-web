import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateTattooDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  style: string;

  @IsUrl()
  @IsNotEmpty()
  image_url: string;
}
