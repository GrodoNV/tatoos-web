import { Controller, Post, Body, HttpCode, HttpStatus, Get, Req, UseGuards, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return this.authService.login(loginDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: any) {
    await this.authService.logLogout(req.user, req);
    return { message: 'Logged out successfully' };
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Post('register')
  register(@Body() data: RegisterDto, @Req() req: Request) {
    const ip = (req.ip || req.socket.remoteAddress || 'unknown') as string;
    return this.authService.register(data, ip);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('employees')
  getEmployees() {
    return this.authService.getEmployees();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('employees/:id')
  updateEmployee(@Param('id') id: string, @Body() data: any, @Req() req: Request) {
    const ip = (req.ip || req.socket.remoteAddress || 'unknown') as string;
    return this.authService.updateEmployee(+id, data, ip);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('employees/:id')
  deleteEmployee(@Param('id') id: string, @Req() req: Request) {
    const ip = (req.ip || req.socket.remoteAddress || 'unknown') as string;
    return this.authService.deleteEmployee(+id, ip);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('logs')
  getLogs() {
    return this.authService.getLogs();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('stats')
  getStats() {
    return this.authService.getStats();
  }

  @Post('visit')
  logVisit(@Body('path') path: string, @Req() req: Request) {
    const ip = (req.ip || req.socket.remoteAddress || 'unknown') as string;
    return this.authService.logVisit(path, ip);
  }
}
