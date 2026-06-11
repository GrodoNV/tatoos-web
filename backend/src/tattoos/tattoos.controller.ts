import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { TattoosService } from './tattoos.service';
import { CreateTattooDto } from './dto/create-tattoo.dto';
import { UpdateTattooDto } from './dto/update-tattoo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import type { Request } from 'express';

@Controller('tattoos')
export class TattoosController {
  constructor(private readonly tattoosService: TattoosService) {}

  @Get()
  findAll() {
    return this.tattoosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tattoosService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'employee')
  @Post()
  create(@Body() createTattooDto: CreateTattooDto, @Req() req: Request) {
    const ip = (req.ip || req.socket.remoteAddress || 'unknown') as string;
    return this.tattoosService.create(createTattooDto, ip);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'employee')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTattooDto: UpdateTattooDto,
    @Req() req: Request
  ) {
    const ip = (req.ip || req.socket.remoteAddress || 'unknown') as string;
    return this.tattoosService.update(id, updateTattooDto, ip);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const ip = (req.ip || req.socket.remoteAddress || 'unknown') as string;
    return this.tattoosService.remove(id, ip);
  }
}
