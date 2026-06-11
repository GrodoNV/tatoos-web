import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { VerifyCaptchaDto } from './dto/verify-captcha.dto';

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Post('verify')
  async verify(@Body() verifyCaptchaDto: VerifyCaptchaDto) {
    const isValid = await this.captchaService.verify(verifyCaptchaDto);
    if (!isValid) {
      throw new BadRequestException('Invalid captcha token');
    }
    return { success: true };
  }
}
