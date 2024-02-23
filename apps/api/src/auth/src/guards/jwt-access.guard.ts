import { Request } from 'express';
import { TokenService } from "@auth/token.service";
import { IUserSessian } from "@auth/domain/interfaces";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor( private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request);

    if (!token || token === 'null') {
      throw new UnauthorizedException("Unauthorized request");
    }

    const payload: IUserSessian = await this.tokenService.validateAccesToken(token);

    if (!payload.userId || !payload.email){
      throw new UnauthorizedException("Unauthorized request");
    }

    request['session'] = payload;

    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    
    return type === 'Bearer' ? token : undefined;
  }
}