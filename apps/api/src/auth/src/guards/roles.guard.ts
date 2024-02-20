import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

export function RolesGuard(roles: string[]) {
  return class RolesGuard implements CanActivate {
    constructor() {}

    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const userRole = request?.session?.role || null;
      
      if (!userRole) {
        throw new ForbiddenException("Forbidden")
      }

      return this.validateRoles(roles, userRole);
    }

    validateRoles(roles: string[], userRoles: string[]) {
      return roles.some(role => userRoles.includes(role));
    }
  }
}