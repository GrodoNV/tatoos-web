import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattoosController } from './tattoos.controller';
import { TattoosService } from './tattoos.service';
import { Tattoo } from './entities/tattoo.entity';
import { AccessLog } from '../auth/entities/access-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tattoo, AccessLog])],
  controllers: [TattoosController],
  providers: [TattoosService]
})
export class TattoosModule {}
