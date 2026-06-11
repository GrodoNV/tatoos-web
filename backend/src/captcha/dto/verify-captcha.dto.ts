import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyCaptchaDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
