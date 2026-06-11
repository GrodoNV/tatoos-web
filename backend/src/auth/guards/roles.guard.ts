import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    // Allow super-admin or users with required roles
    const isSuperAdmin = user.email === 'admin@admin.com';
    if (isSuperAdmin) return true;

    if (!user.role) return false;
    return requiredRoles.map(r => r.toLowerCase()).includes(user.role.toLowerCase());
  }
}
