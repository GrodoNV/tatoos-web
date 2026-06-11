import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { VerifyCaptchaDto } from './dto/verify-captcha.dto';

@Injectable()
export class CaptchaService {
  constructor(private readonly configService: ConfigService) {}

  async verify(verifyCaptchaDto: VerifyCaptchaDto): Promise<boolean> {
    const { token } = verifyCaptchaDto;
    const secret = this.configService.get<string>('CAPTCHA_SECRET');
    const verifyUrl = this.configService.get<string>('CAPTCHA_VERIFY_URL') || '';

    try {
      const { data } = await axios.post(verifyUrl, {
        secret: secret,
        response: token,
      });

      return data.success;
    } catch (error) {
      throw new InternalServerErrorException('Error verifying captcha');
    }
  }
}
